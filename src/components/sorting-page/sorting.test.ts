import React from "react";
import { selectionSort, bubbleSort } from "./sorting-algo";
import { randomArr } from "./utils";
import { TItem } from "./sorting-page";
import { ElementStates } from "../../types/element-states";

describe("Seclection sort algorithm", () => {
  it("works with empty array", () => {
    const testArray: TItem[] = [];
    const result = selectionSort(testArray, "ascending");
    expect(result).toEqual([]);
  });

  it("works with array of one element", () => {
    const testArray: TItem[] = [
      {
        "item": 1,
        "state": ElementStates.Default,
      },
    ];
    const result = selectionSort(testArray, "ascending");
    expect(result).toEqual([
      [
        {
          "item": 1,
          "state": ElementStates.Changing,
        },
      ],
      [
        {
          "item": 1,
          "state": ElementStates.Modified,
        },
      ],
    ]);
  });


  it("works with array of several elements", () => {
    const testArray: TItem[] = [
      {
          "item": 29,
          "state": ElementStates.Default
      },
      {
          "item": 73,
          "state": ElementStates.Default
      }
    ];
    const result = selectionSort(testArray, "ascending");
    expect(result).toEqual([
        [
            {
                "item": 73,
                "state": "changing"
            },
            {
                "item": 29,
                "state": "default"
            }
        ],
        [
            {
                "item": 73,
                "state": "changing"
            },
            {
                "item": 29,
                "state": "changing"
            }
        ],
        [
            {
                "item": 29,
                "state": "changing"
            },
            {
                "item": 73,
                "state": "changing"
            }
        ],
        [
            {
                "item": 29,
                "state": "changing"
            },
            {
                "item": 73,
                "state": "default"
            }
        ],
        [
            {
                "item": 29,
                "state": "modified"
            },
            {
                "item": 73,
                "state": "default"
            }
        ],
        [
            {
                "item": 29,
                "state": "modified"
            },
            {
                "item": 73,
                "state": "changing"
            }
        ],
        [
            {
                "item": 29,
                "state": "modified"
            },
            {
                "item": 73,
                "state": "modified"
            }
        ]
    ]);
  });
});