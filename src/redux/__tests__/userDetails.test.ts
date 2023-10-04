import userDetailsReducer, {
  insertUserDetails,
  deleteAllUserDetails,
  deleteSingleItem,
  updateUserDetails,
} from "../userDetailsSlice";

import type { UserDetailsStateT } from "../../types";

describe("test userDetailsReducer", () => {
  it("should handle initial state", () => {
    expect(userDetailsReducer(undefined, { type: undefined })).toEqual({ data: [] });
  });

  it("should handle insertUserDetails", () => {
    const mockData: UserDetailsStateT = {
      key: "1",
      prefix: "prefix",
      firstname: "firstname",
      lastname: "lastname",
      id_citizen: "id_citizen",
    };

    const result = userDetailsReducer(
      { data: [] },
      insertUserDetails({ details: mockData })
    );

    expect(result.data).toHaveLength(1);
    expect(result).toEqual({
      data: [
        {
          key: "1",
          prefix: "prefix",
          firstname: "firstname",
          lastname: "lastname",
          id_citizen: "id_citizen",
        },
      ],
    });
  });

  it("should handle deleteAllUserDetails", () => {
    const mockData: UserDetailsStateT[] = [
      {
        key: "1",
        prefix: "prefix",
        firstname: "firstname",
        lastname: "lastname",
        id_citizen: "id_citizen",
      },
      {
        key: "2",
        prefix: "prefix",
        firstname: "firstname",
        lastname: "lastname",
        id_citizen: "id_citizen",
      },
    ];

    expect(userDetailsReducer({ data: mockData }, deleteAllUserDetails())).toEqual({
      data: [],
    });
  });

  it("should handle deleteSingleItem", () => {
    const mockData: UserDetailsStateT[] = [
      {
        key: "1",
        prefix: "prefix",
        firstname: "firstname",
        lastname: "lastname",
        id_citizen: "id_citizen",
      },
      {
        key: "2",
        prefix: "prefix",
        firstname: "firstname",
        lastname: "lastname",
        id_citizen: "id_citizen",
      },
    ];

    expect(
      userDetailsReducer({ data: mockData }, deleteSingleItem({ key: "2" }))
    ).toEqual({
      data: [
        {
          key: "1",
          prefix: "prefix",
          firstname: "firstname",
          lastname: "lastname",
          id_citizen: "id_citizen",
        },
      ],
    });
  });

  it("should handle updateUserDetails", () => {
    const mockData: UserDetailsStateT[] = [
      {
        key: "1",
        prefix: "prefix",
        firstname: "firstname",
        lastname: "lastname",
        id_citizen: "id_citizen",
      },
    ];

    const details = {
      key: "1",
      prefix: "prefix update",
      firstname: "firstname update",
      lastname: "lastname update",
      id_citizen: "id_citizen update",
    };

    expect(
      userDetailsReducer(
        { data: mockData },
        updateUserDetails({ details, key: details.key })
      )
    ).toEqual({
      data: [
        {
          key: "1",
          prefix: "prefix update",
          firstname: "firstname update",
          lastname: "lastname update",
          id_citizen: "id_citizen update",
        },
      ],
    });
  });
});
