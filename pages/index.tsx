import { MainLayout } from "@/components/layouts"
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <MainLayout title="Home" pageDescription="Los mejores productos">
      <Box sx={{ mt: 6 }}>
       {/*  <img src="/banner1.gif" width="100%" alt="bannerTest" /> */}
      </Box>
    </MainLayout>
  )
}

export default HomePage;