export const Estadisticas = ({ tareas, tareasCompletadas }) => {
  const totalTareas = tareas.length;
  const totalPendientes = tareas.length - tareasCompletadas;

  //const totalTareas =
  return (
    <div>
      Total de tareas: {totalTareas}
      <hr />
      Terminadas: {tareasCompletadas} || Pendientes: {totalPendientes}
    </div>
  );
};
