import testHelper from "./testHelper";
import CollectionTile from "../../app/javascript/react/components/CollectionTile";

describe("MemeTile", () => {
  let name,
    img,
    wrapper;

  beforeEach (() => {
    jasmineEnzyme();
    wrapper = mount(
      <CollectionTile
        name="first collection"
        img="www.exampleimage.com"
      />
    );
  });

  it("should render a dd tag", () => {
    expect(wrapper.find("dd")).toBePresent();
  });

  it("should render the CollectionTile component with its specific props", () => {
    expect(wrapper.find(CollectionTile).props()).toEqual({
      name: "first collection",
      img: "www.exampleimage.com"
    });
  });
});
