import { Container, Text } from "@mantine/core";

export function NotFoundPage() {
  return (
    <Container strategy="grid">
      <Text c="dimmed" size="lg" ta="center">
        Page not exist
      </Text>
    </Container>
  );
}
