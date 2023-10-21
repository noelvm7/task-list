import React, { useState } from "react";
import "./app.css";
import Title from "./components/Title";
import { FcPlus, FcCheckmark, FcEmptyTrash } from "react-icons/fc";
import { Estadisticas } from "./components/Estadisticas";
import useTareas from "./Hooks/useTareas";
import { ChakraProvider, CSSReset, Button, Box } from "@chakra-ui/react";


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleColorMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const colorMode = isDarkMode ? "light" : "dark";

  const {
    tareas,
    nuevaTarea,
    setNuevaTarea,
    nuevaDescripcion, // Agrega la descripción
    setNuevaDescripcion, // Agrega la función para establecer la descripción
    controlarAgregarTarea,
    controlarAlternarCompletada,
    controlarEliminarTarea,
    limpiarTodasLasTareas
  } = useTareas();

  const controlarCambioTarea = (event) => {
    setNuevaTarea(event.target.value); // Utiliza la función del hook
  };

  const controlarCambioDescripcion = (event) => {
    setNuevaDescripcion(event.target.value); // Maneja el cambio en la descripción
  };

  function contarTareasCompletadas(tareas) {
    let contador = 0;
    for (const tarea of tareas) {
      if (tarea.completada) {
        contador++;
      }
    }
    return contador;
  }

  return (
    
    <ChakraProvider resetCSS>
      <CSSReset />
      <Box  bg='blue.900' w='100%' p={2} color='white' display='flex' justifyContent='space-between'>
      Laboratorio: ToDo List con Chakra UI
      <Button 
      className="botonesAgregar"
      onClick={toggleColorMode}> 
       {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      </Box>
      <Box bg={colorMode === "light" ? "whitesmoke" : "gray.800"} color={colorMode === "light" ? "black" : "white"}>
    <div className="contenedor0">

      <div className="titulo">
        <Title />
      </div>

      <div className="box2">
        <p>
          
          <input
            type="text"
            value={nuevaTarea}
            size={22}
            placeholder="Escribe una tarea..."
            onChange={controlarCambioTarea}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                controlarAgregarTarea();
              }
            }}
          />
            <input
            type="text"
            value={nuevaDescripcion}
            size={25}
            placeholder="Descripción (opcional)..."
            onChange={controlarCambioDescripcion}
          />
          
          <button
            title="agregar nueva tarea"
            className="botonesAgregar"
            onClick={controlarAgregarTarea}
          >
            Agregar <FcPlus />
          </button>

          {tareas.map((tarea, index) => (
            <h3 className="lista" key={index}>
              <button
                className="redondo" //check buttom
                title="marcar como tarea realizada"
                onClick={() => controlarAlternarCompletada(index)}
              >
                <FcCheckmark />
              </button>
              <span
                style={{
                  textDecoration: tarea.completada
                    ? "red double line-through"
                    : "none",
                }}
                /* para marcar como hecha se hace click en el texto de la tarea||   textDecoration: tarea.completada ? 'redunderline' :  'none' */
              >
                {tarea.texto}  {tarea.descripcion && (
      <span className="descripcion">{tarea.descripcion}</span>
    )}
              </span>
              <div className="lugarIcono">
                <button //eliminar
                  title="eliminar tarea"
                  className="botonesEliminar "
                  onClick={() => controlarEliminarTarea(index)}
                >
                  <FcEmptyTrash />
                </button>
              </div></h3>
            
          ))}
        </p>
      </div>
      <hr/>
      <div>
        <hr />
        <form className="estadisticas">
          <div>
            <Estadisticas
              tareas={tareas}
              tareasCompletadas={contarTareasCompletadas(tareas)}
            />
          </div>
          <hr />
          <button
            title="Eliminar todas tareas en general?"
            className="botonesGenerales"
            onClick={limpiarTodasLasTareas}
          >
            {" "}
            Limpiar Todo
          </button>
        </form>
      </div>
    </div>
    </Box>
    </ChakraProvider>
  );
}

export default App;
