import RootLayout from "../routes/RootLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    </div>
  );
}
export default App;
