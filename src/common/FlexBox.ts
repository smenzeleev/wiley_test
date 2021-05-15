import styled from "styled-components";
import { prop } from "styled-tools";

interface Props {
  direction?: "row" | "column" | "reverse-row" | "reverse-column";
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  justifyContent?: string;
  justifyItems?: string;
  alignItems?: string;
  alignContent?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  overflow?: string;
  wrap?: "wrap" | "nowrap";
  order?: string;
  grow?: string;
  shrink?: string;
  basis?: string;
}

const FlexBox = styled.div<Props>`
  display: flex;
  flex-direction: ${prop("direction", "row")};
  width: ${prop("width", "100%")};
  height: ${prop("height", "auto")};
  margin: ${prop("margin", 0)};
  padding: ${prop("padding", 0)};
  justify-items: ${prop("justifyItems", "stretch")};
  align-items: ${prop("alignItems", "stretch")};
  align-content: ${prop("alignContent", "normal")};
  align-self: ${prop("alignSelf", "auto")};
  justify-content: ${prop("justifyContent", "flex-start")};
  justify-self: ${prop("justifySelf", "auto")};
  overflow: ${prop("overflow", null)};
  min-width: ${prop("minWidth")};
  max-width: ${prop("maxWidth", "none")};
  min-height: ${prop("minHeight")};
  max-height: ${prop("maxHeight", "none")};
  order: ${prop("order", 0)};
  flex-wrap: ${prop("wrap", "nowrap")};
  flex-grow: ${prop("grow", 0)};
  flex-shrink: ${prop("shrink", 1)};
  flex-basis: ${prop("basis", "auto")};
`;

export default FlexBox;
