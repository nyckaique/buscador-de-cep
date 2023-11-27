import {
  Button,
  Grid,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import api from "../services/api";

export default function Buscacep() {
  //declarando o input e o cep para utilizar o useState
  const [input, setInput] = useState("");
  const [cep, setCEP] = useState({});

  async function getCEP() {
    //se o input for vazio, mostra um alert e retorna nada, encerrando a função
    if (input === "") {
      alert("digite alguma coisa para buscar!");
      return;
    }
    //se o input nao for vazio, tenta fazer a requisição
    try {
      //faz requisição assincrona utilizando a api que criamos, armazera em response e depois no cep com setCEP, depois limpa o input
      const response = await api.get(`${input}/json`);
      setCEP(response.data);
      setInput("");
    } catch {
      //se der erro na requisição, mostra um alerta e limpa o input
      alert("Deu um erro na busca!");
      setInput("");
    }
  }

  return (
    <div>
      <Grid
        container
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop="4em "
        style={{ backgroundColor: "#61a5c2", height: "100vh" }}
        bg-blue
      >
        <Grid xs={11}>
          <Typography
            variant="h4"
            gutterBottom
            color="white"
            style={{
              fontWeight: "700",
              wordSpacing: "5px",
              textShadow: "3px 3px rgba(0,0,0,0.3)",
            }}
          >
            BUSCADOR DE CEP
          </Typography>
          <Paper
            style={{ padding: "1em", borderRadius: "1em", marginBottom: "1em" }}
            elevation={6}
          >
            <form style={{ display: "flex", gap: "1em" }}>
              <TextField
                id="outlined-basic"
                label="CEP"
                variant="outlined"
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button variant="outlined" onClick={getCEP}>
                <SearchIcon />
              </Button>
            </form>
          </Paper>
          {/* Somente vai aparecer abaixo caso tenha a chave do objeto cep */}
          {Object.keys(cep).length > 0 && (
            <Paper
              style={{ padding: "1em", borderRadius: "1em" }}
              elevation={6}
            >
              <p>CEP: {cep.cep}</p>
              <p>{cep.logradouro}</p>
              <p>{cep.complemento}</p>
              <p>{cep.bairro}</p>
              <p>
                {cep.localidade} - {cep.uf}
              </p>
            </Paper>
          )}
        </Grid>
        <p style={{ position: "absolute", bottom: "30px" }}>
          Desenvolvido por{" "}
          <a
            href="http://github.com/nyckaique"
            target="_blank"
            style={{ color: "inherit" }}
          >
            Nycollas Kaique
          </a>
        </p>
      </Grid>
    </div>
  );
}
