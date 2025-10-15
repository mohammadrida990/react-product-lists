import { LoadingOverlay, Box } from "@mantine/core";
function Loader() {
  return (
    <Box
      pos="relative"
      className="flex justify-center items-center bg-amber-50 w-screen h-screen"
    >
      <LoadingOverlay visible={true} loaderProps={{ children: "Loading..." }} />
    </Box>
  );
}

export default Loader;
