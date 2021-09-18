// When we import wasm files we treat the default import as a string
// This is consistent with the behaviour which we require from webpack if it sees
// such an import.
declare module "\*.wasm" {
  const content: string;
  export default content;
}
