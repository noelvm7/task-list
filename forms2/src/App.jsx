import React, { useState } from "react";
import "./app.css";
import Title from "./components/Title";
import { FcPlus, FcCheckmark, FcEmptyTrash } from "react-icons/fc";
import { Estadisticas } from "./components/Estadisticas";
import useTareas from "./Hooks/useTareas";

function App() {
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
    <div className="contenedor0">
      <div></div>
      <div className="titulo">
        <Title />
      </div>
      <div className="OtrasFilas"></div>
      <div className="OtrasFilas"></div>
      <div className="box2">
        <p>
          
          <input
            type="text"
            value={nuevaTarea}
            size={23}
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
            size={27}
            placeholder="Añade una descripción (opcional)..."
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

      <div></div>
      <div></div>

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
  );
}

export default App;
