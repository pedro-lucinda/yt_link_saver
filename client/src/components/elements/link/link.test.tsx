import { render } from "@testing-library/react";
import { LinkComponent } from ".";

describe("LinkComponent", () => {
  it("should render without crashing", () => {
    const { container } = render(<LinkComponent />);
    expect(container).toBeInTheDocument();
  });
});
