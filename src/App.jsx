import "@mantine/core/styles.css";
import { useState } from "react";
import TableR from "./components/table"
import { Box, MantineProvider, BackgroundImage, Center } from "@mantine/core";
import Titulo from "./components/title";
import Texto from "./components/text";

function App() {
  const [count, setCount] = useState(0)

  return (
    <MantineProvider>
      <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <BackgroundImage
          src="https://i.ytimg.com/vi/MU3qrgR2Kkc/maxresdefault.jpg"
          style={{
            minHeight: '100vh',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Center style={{ marginTop: '2rem' }}>
            <Titulo/>
          </Center>

          <Center style={{ flex: 1 }}>
            <TableR/>
          </Center>
          <Texto/>
        </BackgroundImage>
      </Box>
    </MantineProvider>
  )
}

export default App;
