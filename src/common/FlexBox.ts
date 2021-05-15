import styled from "styled-components";
import { prop } from "styled-tools";

interface Props {
  width?: string;
  height?: string;
}

const FlexBox = styled.div<Props>`
  display: flex;
  width: ${prop("width", "100%")};
  height: ${prop("height", "auto")};
`;

export default FlexBox;
