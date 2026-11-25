import { describe, it, expect } from "vitest";
import { groupProgress, CONTACT_GROUPS } from "./formProgress";

const G = CONTACT_GROUPS;

describe("groupProgress", () => {
  it("nothing is complete on an empty form", () => {
    expect(groupProgress({}, {}, G)).toEqual({ about: false, event: false, details: false });
  });

  it("prefilled eventType alone does not complete 'Your event'", () => {
    expect(groupProgress({ eventType: "Baraat" }, {}, G).event).toBe(false);
  });

  it("required fields valid completes the group; an errored optional field blocks it", () => {
    const v = { fullName: "Ayesha", mobile: "9876543210" };
    expect(groupProgress(v, {}, G).about).toBe(true);
    expect(groupProgress({ ...v, email: "x" }, { email: { message: "bad" } }, G).about).toBe(false);
  });

  it("a required field with an error is not complete", () => {
    expect(groupProgress({ fullName: "A", mobile: "98" }, { mobile: { message: "short" } }, G).about).toBe(false);
  });

  it("all-optional group needs one filled, error-free field", () => {
    expect(groupProgress({ additionalDetails: "  " }, {}, G).details).toBe(false);
    expect(groupProgress({ budgetRange: "5-10 Lakhs" }, {}, G).details).toBe(true);
    expect(groupProgress({ budgetRange: "x" }, { budgetRange: { message: "bad" } }, G).details).toBe(false);
  });

  it("numbers count as filled", () => {
    expect(
      groupProgress({ eventType: "Baraat", eventLocation: "Falaknuma", expectedGuests: 300 }, {}, G).event
    ).toBe(true);
  });
});
