declare module "jodit-react" {
  import { ComponentType } from "react";

  interface JoditEditorProps {
    value: string;
    config?: Record<string, any>;
    onChange?: (newValue: string) => void;
    onBlur?: (newValue: string) => void;
  }

  const JoditEditor: ComponentType<JoditEditorProps>;
  export default JoditEditor;
}