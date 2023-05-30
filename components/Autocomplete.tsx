import * as React from "react";
import type { ComboBoxProps } from "@react-types/combobox";
import type { LoadingState } from "@react-types/shared";
import { useComboBoxState } from "react-stately";
import { useComboBox, useFilter } from "react-aria";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  FormLabel,
  Box,
  Spinner,
  InputLeftElement,
} from "@chakra-ui/react";

import { ListBox } from "./ListBox";
import { Popover } from "./Popover";

export { Item, Section } from "react-stately";

interface AutocompleteProps<T> extends ComboBoxProps<T> {
  loadingState?: LoadingState;
  isInvalid: boolean;
  onLoadMore?: () => void;
}

export function Autocomplete<T extends object>(props: AutocompleteProps<T>) {
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ ...props, defaultFilter: contains });

  let inputRef = React.useRef<HTMLInputElement>(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);

  let { inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  const [inputWidth, setInputWidth] = React.useState(0);
  React.useLayoutEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, [inputRef]);

  return (
    <Box display="inline-block" position="relative" width="full">
      <FormLabel {...labelProps}>{props.label}</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <Search2Icon color="gray.500" />
        </InputLeftElement>
        <Input
          {...inputProps}
          ref={inputRef}
          size="md"
          isInvalid={props.isInvalid}
        />

        <InputRightElement>
          {props.loadingState === "loading" ||
          props.loadingState === "filtering" ? (
            <Spinner color="blue.400" size="sm" />
          ) : null}
        </InputRightElement>
      </InputGroup>
      {state.isOpen && (
        <Popover
          popoverRef={popoverRef}
          triggerRef={inputRef}
          state={state}
          isNonModal={false}
          placement="bottom start"
          inputWidth={inputWidth}
        >
          <ListBox
            {...listBoxProps}
            listBoxRef={listBoxRef}
            state={state}
            loadingState={props.loadingState}
            onLoadMore={props.onLoadMore}
          />
        </Popover>
      )}
    </Box>
  );
}
