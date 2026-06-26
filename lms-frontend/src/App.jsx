// AppRouter already contains BrowserRouter → AuthProvider → Routes.
// No additional wrapping needed here.
import AppRouter from "./routes/AppRouter";

export default function App() {
  return <AppRouter />;
}
