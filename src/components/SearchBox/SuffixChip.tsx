import { Chip } from "@mantine/core";
import { useStyles } from "./searchBox.style";
import { suffix } from "./suffix";
import { useRecoilState } from "recoil";
import {

    searchSelector,

} from "recoil-state/state";

const SuffixChip = () => {
    const { classes } = useStyles();
    const [selector, setSelector] = useRecoilState(searchSelector);

    const changeSelector = (value: string[]) => {
        if (value.length >= Object.entries(suffix).length || value.length <= 0) {
            setSelector(["All"]);
        } else {
            if (value.length >= 2) {
                let valueIncludeAll = value.includes("All");
                let selectorIncludeAll = selector.includes("All");

                if (valueIncludeAll && selectorIncludeAll) {
                    let result = value.filter((s) => s !== "All");
                    setSelector(result);
                } else if (valueIncludeAll) {
                    setSelector(["All"]);
                } else {
                    setSelector(value);
                }
            } else {
                setSelector(value);
            }
        }
    };

    return (
        <div className="chip-selector-container">
            <Chip.Group
                position="center"
                multiple
                defaultValue={["all"]}
                value={selector}
                onChange={changeSelector}
            >
                {
                    Object.keys(suffix).map((item, index) => (
                        <Chip key={index} classNames={classes} value={item}>
                            {item}
                        </Chip>
                    ))
                }
                <Chip classNames={classes} value="All">
                    All
                </Chip>
            </Chip.Group>
        </div>
    )
}

export default SuffixChip;