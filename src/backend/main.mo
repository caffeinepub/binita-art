import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type Painting = {
    id : Nat;
    title : Text;
    priceUSD : Float;
    dimensions : Text;
    material : Text;
    description : Text;
    image : Storage.ExternalBlob;
  };

  type PaintingInfo = {
    title : Text;
    priceUSD : Float;
    dimensions : Text;
    material : Text;
    description : Text;
    image : Storage.ExternalBlob;
  };

  func comparePaintings(p1 : Painting, p2 : Painting) : Order.Order {
    Nat.compare(p1.id, p2.id);
  };

  stable var nextId = 0;
  stable var paintingsStable : [(Nat, Painting)] = [];
  let paintings = Map.empty<Nat, Painting>();

  system func preupgrade() {
    paintingsStable := paintings.entries().toArray();
  };

  system func postupgrade() {
    for ((k, v) in paintingsStable.vals()) {
      paintings.add(k, v);
    };
    paintingsStable := [];
  };

  func getNextId() : Nat {
    let id = nextId;
    nextId += 1;
    id;
  };

  public shared func addPainting(info : PaintingInfo) : async Nat {
    let id = getNextId();
    let painting : Painting = {
      id;
      title = info.title;
      priceUSD = info.priceUSD;
      dimensions = info.dimensions;
      material = info.material;
      description = info.description;
      image = info.image;
    };
    paintings.add(id, painting);
    id;
  };

  public query func getPainting(id : Nat) : async Painting {
    switch (paintings.get(id)) {
      case (null) { Runtime.trap("Painting does not exist") };
      case (?painting) { painting };
    };
  };

  public query func getAllPaintings() : async [Painting] {
    paintings.values().toArray().sort(comparePaintings);
  };

  public shared func updatePainting(id : Nat, newInfo : PaintingInfo) : async () {
    switch (paintings.get(id)) {
      case (null) { Runtime.trap("Painting does not exist") };
      case (?_) {
        let updatedPainting : Painting = {
          id;
          title = newInfo.title;
          priceUSD = newInfo.priceUSD;
          dimensions = newInfo.dimensions;
          material = newInfo.material;
          description = newInfo.description;
          image = newInfo.image;
        };
        paintings.add(id, updatedPainting);
      };
    };
  };

  public shared func deletePainting(id : Nat) : async () {
    if (not paintings.containsKey(id)) {
      Runtime.trap("Painting does not exist");
    };
    paintings.remove(id);
  };
};
