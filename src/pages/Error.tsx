import { useRouteError } from "react-router-dom";

export default function PaginaError() {
  const error: any = useRouteError();

  return (
    <div id="pagina-error">
      <h1>Recorcholis</h1>
      <p>Parece que no se te da muy bien escribir urls</p>
      <p>
        <i>{error?.statusText || error?.message || "Página no encontrada"}</i>
      </p>
    </div>
  );
}
