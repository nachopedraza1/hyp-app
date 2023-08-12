import { MainLayout } from "@/components/layouts"
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <MainLayout title="Home" pageDescription="Los mejores productos">
      <Box mt={7.3}>
        <img src="/BANNER5.png" width="100%" alt="bannerTest" />
      </Box>
    </MainLayout>
  )
}

export default HomePage;