import GafetePrueba from "../components/GafetePrueba";
import GafetePdfDemo from "../components/GafetePdfDemo";
import ModalInvitadoEspecial from "../components/modals/ModalInvitadoEspecial";
export default function Dashboard() {
  return (
    <div className="min-h-screen  w-full flex items-center flex-col  gap-5 ml-0 p-4 text-2xl font-bold md:ml-24">
      <h2>Bienvenido al panel de administración de BOOOM EVENTOS</h2>
      {/* <div className="w-full flex justify-center items-start gap-3 flex-wrap">

        <GafetePrueba />

        <GafetePdfDemo />

      </div> */}
      {/* <ModalInvitadoEspecial /> */}

    </div>
  );
}
