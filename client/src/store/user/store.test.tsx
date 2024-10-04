import { act } from "react-dom/test-utils";
import { useUserStore } from ".";
import "jest";

describe("useUserStore", () => {
  it("should have the correct initial state", () => {
    const state = useUserStore.getState();
    expect(state.user.name).toBe("John Doe");
    expect(state.user.email).toBe("");
  });

  it("should update the user email", () => {
    act(() => {
      useUserStore.getState().updateUser({ email: "email@email.com" });
    });

    const updatedState = useUserStore.getState();
    expect(updatedState.user.email).toBe("email@email.com");
  });

  // Reset state after each test if necessary
  afterEach(() => {
    useUserStore.setState({ user: { name: "John Doe", email: "" } }, true);
  });
});
