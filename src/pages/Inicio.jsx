import { Link } from "react-router-dom";

export default function Inicio() {
  return (
    <div className="flex-1 px-6 py-12 lg:px-12 lg:py-20">

      <div className="max-w-6xl grid lg:grid-cols-[7fr_5fr] gap-14 lg:gap-20 items-start">

        {/* Mensaje principal */}
        <section>

          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-5">
            Gestor de tareas
          </p>

          <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl leading-[1.02] max-w-2xl">
            Termina lo que empiezas.
          </h1>

          <p className="mt-8 text-lg text-base-content/70 max-w-lg">
            Anota tus pendientes, márcalos cuando estén listos y retoma
            siempre donde lo dejaste. Sin complicaciones.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-primary btn-lg">
              Crear cuenta
            </Link>

            <Link to="/login" className="btn btn-outline btn-lg">
              Iniciar sesión
            </Link>
          </div>

          <dl className="mt-16 grid sm:grid-cols-3 gap-8 border-t border-base-300 pt-8 max-w-2xl">
            <div>
              <dt className="font-display text-primary text-2xl">01</dt>
              <dd className="mt-1 text-sm text-base-content/70">
                Crea y edita tareas al instante.
              </dd>
            </div>
            <div>
              <dt className="font-display text-primary text-2xl">02</dt>
              <dd className="mt-1 text-sm text-base-content/70">
                Marca lo que ya terminaste.
              </dd>
            </div>
            <div>
              <dt className="font-display text-primary text-2xl">03</dt>
              <dd className="mt-1 text-sm text-base-content/70">
                Tu lista, siempre actualizada.
              </dd>
            </div>
          </dl>

        </section>

        {/* Vista previa decorativa */}
        <aside
          aria-hidden="true"
          className="bg-neutral text-neutral-content p-6 rounded-box lg:mt-10"
        >

          <p className="text-xs uppercase tracking-[0.25em] opacity-60 mb-4">
            Así se ve tu día
          </p>

          <ul className="divide-y divide-neutral-content/15">

            <li className="flex items-center gap-3 py-4">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                checked
                readOnly
              />
              <span className="font-display text-lg line-through opacity-50">
                Enviar propuesta
              </span>
            </li>

            <li className="flex items-center gap-3 py-4">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                checked={false}
                readOnly
              />
              <span className="font-display text-lg">Revisar presupuesto</span>
            </li>

            <li className="flex items-center gap-3 py-4">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                checked={false}
                readOnly
              />
              <span className="font-display text-lg">Llamar al proveedor</span>
            </li>

          </ul>

        </aside>

      </div>

    </div>
  );
}