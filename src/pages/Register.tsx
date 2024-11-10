import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import Imput from "../components/Imput";
import Header from "../components/Header";

interface myFormValues {
  full_name: string;
  surname: string;
  password: string;
  address: string;
  phone: string;
  dni: string;
  email: string;
  roleId: number;
  cuit?: string;
  razonSocial?: string;
  provincia?: string;
  localidad?: string;
}

export const Register = () => {
  const { signup, authErrors, signupCliente, user } = useAuth();
  const [isCliente, setIsCliente] = useState(false);
  const style = isCliente ? "block w-full ml-5" : "hidedn";

  if (user && user.roleId == 3) return <Navigate to="/main" replace />;
  if (user && user.roleId !== 1) return <Navigate to="/" replace />;

  const initialValues: myFormValues = {
    full_name: "",
    surname: "",
    password: "",
    address: "",
    phone: "",
    dni: "",
    email: "",
    roleId: 0,
    cuit: "",
    razonSocial: "",
    provincia: "",
    localidad: "",
  };

  const schema = Yup.object().shape({
    full_name: Yup.string().required("Se requiere un nombre de usuario"),
    surname: Yup.string().required("Se requiere un nombre de usuario"),
    password: Yup.string()
      .max(20, "Máximo permitido 20 caracteres")
      .required("Se requiere contraseña"),
    address: Yup.string()
      .max(50, "Máximo permitido 50 caracteres")
      .required("Se requiere dirección"),
    phone: Yup.string().required("Se requiere teléfono"),
    dni: Yup.number().required("Se requiere DNI").positive().integer(),
    email: Yup.string().email("Email inválido").required("Se requiere email"),

    roleId: Yup.number().required("Se requiere roleId").positive().integer(),

    // Validación condicional con Yup.number().when()
    cuit: Yup.number()
      .positive()
      .integer()
      .when("roleId", {
        is: (val: number) => val === 2,
        then: (schema) => schema.required("cuit es requerido"),
        otherwise: (schema) => schema.notRequired(),
      }),
    razonSocial: Yup.string().when("roleId", {
      is: (val: number) => val === 2,
      then: (schema) => schema.required("razon Social es requerido"),
      otherwise: (schema) => schema.notRequired(),
    }),
    provincia: Yup.string().when("roleId", {
      is: (val: number) => val === 2,
      then: (schema) => schema.required("provincia es requerido"),
      otherwise: (schema) => schema.notRequired(),
    }),
    localidad: Yup.string().when("roleId", {
      is: (val: number) => val === 2,
      then: (schema) => schema.required("localidad es requerido"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleUserSubmit = async (values: myFormValues) => {
    const { cuit, razonSocial, provincia, localidad, ...userValues } = values;

    console.log("Enviando datos a la tabla user:", userValues);
    const createdUser = await signup(userValues); // Asegúrate de que retorna el usuario creado con su `id`
    return createdUser;
  };

  const handleClientSubmit = async (values: myFormValues, userId: string) => {
    const { cuit, razonSocial, provincia, localidad } = values;
    const nuevosValores = { cuit, razonSocial, provincia, localidad, userId }; // Incluye el `userId`

    console.log(
      "Enviando datos a la tabla clientes con ID de usuario:",
      nuevosValores
    );
    await signupCliente(nuevosValores);
  };

  const handleSubmit = async (values: myFormValues) => {
    const createdUser = await handleUserSubmit(values);
    console.log("aaaa",values)
    alert(`Usuario creado ${createdUser.full_name}`);

    if (values.roleId === 2 && createdUser?.id) {
      await handleClientSubmit(values, createdUser.id);
    } else {
      console.error(
        "No se ha podido obtener el ID del usuario después del registro."
      );
    }
  };

  return (
    <section className="h-screen w-full bg-[url('./assets/frame-2.jpg')] bg-cover bg-center  flex items-center flex-col ">
      <Header />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <article className="w-full mt-10 flex justify-center ">
            <Form className="h-full" onSubmit={handleSubmit}>
              <div className=" bg-custom-blue rounded-xl shadow-lg flex flex-col justify-between w-[80vw] ">
                <h1 className="bg-custom-green text-[#ffff] font-bold  h-auto  w-full text-2xl p-2 flex justify-center rounded-t-xl">
                  REGISTRO
                </h1>
                <div className="flex p-5">
                  <div className="w-full mr-5">
                    <Imput
                      nombreUsuario={"Nombre Completo"}
                      name={"full_name"}
                      type="text"
                      value={values.full_name}
                      onChange={handleChange}
                    >
                      {errors.full_name && touched.full_name ? (
                        <div className="text-custom-rojoalerta flex items-center">
                          {errors.full_name}
                        </div>
                      ) : null}
                    </Imput>

                    <Imput
                      nombreUsuario={"Apellido"}
                      name={"surname"}
                      type="text"
                      value={values.surname}
                      onChange={handleChange}
                    >
                      {errors. surname && touched.surname ? (
                        <div className="text-custom-rojoalerta flex items-center">
                          {errors.surname}
                        </div>
                      ) : null}
                    </Imput>

                    <Imput
                      nombreUsuario={"DNI"}
                      name={"dni"}
                      type="number"
                      value={values.dni}
                      onChange={handleChange}
                    >
                      {errors.dni && touched.dni ? (
                        <div className="text-custom-rojoalerta flex items-center">
                          {errors.dni}
                        </div>
                      ) : null}
                    </Imput>
                    <Imput
                      nombreUsuario={"Dirección"}
                      name={"address"}
                      type="text"
                      value={values.address}
                      onChange={handleChange}
                    >
                      {errors.address && touched.address ? (
                        <div className="text-custom-rojoalerta flex items-center">
                          {errors.address}
                        </div>
                      ) : null}
                    </Imput>
                   
                  </div>

                  <div className="w-full">
                  <Imput
                      nombreUsuario={"Teléfono"}
                      name={"phone"}
                      type="text"
                      value={values.phone}
                      onChange={handleChange}
                    >
                      {errors.phone && touched.phone ? (
                        <div className="text-custom-rojoalerta flex items-center">
                          {errors.phone}
                        </div>
                      ) : null}
                    </Imput>
                    <Imput
                      nombreUsuario={"Email"}
                      name={"email"}
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                    >
                      {errors.email && touched.email ? (
                        <div className="text-custom-rojoalerta flex items-center">
                          {errors.email}
                        </div>
                      ) : null}
                    </Imput>
                    <Imput
                      nombreUsuario={"Contraseña"}
                      name={"password"}
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                    >
                      {errors.password && touched.password ? (
                        <div className="text-custom-rojoalerta flex items-center">
                          {errors.password}
                        </div>
                      ) : null}
                    </Imput>

                    <select
                      name="roleId"
                      value={values.roleId}
                      onChange={(e) => {
                        const valueAsNumber = parseInt(e.target.value, 10); // Convertir a número
                        handleChange({
                          target: {
                            name: "roleId",
                            value: valueAsNumber, // Enviar el número a Formik
                          },
                        });
                        setIsCliente(valueAsNumber === 2);
                      }}
                      className="form-select w-full placeholder-custom-blue p-2 h-[40px] rounded-[5px] my-[10px]"
                    >
                      <option value="">Selecciona un rol</option>
                      <option value={1}>Admin</option>
                      <option value={2}>Cliente</option>
                      <option value={3}>Vendedor</option>
                      <option value={4}>Transportista</option>
                    </select>
                    {errors.roleId && touched.roleId ? (
                      <div className="text-custom-rojoalerta flex items-center">
                        {errors.roleId}
                      </div>
                    ) : null}
                  </div>
                  <div className={style}>
                    {isCliente && (
                      <>
                        <Imput
                          nombreUsuario={"Cuit"}
                          name={"cuit"}
                          type="number"
                          value={values.cuit}
                          onChange={handleChange}
                        >
                          {errors.cuit && touched.cuit ? (
                            <div className="text-red-600">{errors.cuit}</div>
                          ) : null}
                        </Imput>

                        <Imput
                          nombreUsuario={"Razón Social"}
                          name={"razonSocial"}
                          type="text"
                          value={values.razonSocial}
                          onChange={handleChange}
                        >
                          {errors.razonSocial && touched.razonSocial ? (
                            <div className="text-red-600">
                              {errors.razonSocial}
                            </div>
                          ) : null}
                        </Imput>

                        <Imput
                          nombreUsuario={"Provincia"}
                          name={"provincia"}
                          type="text"
                          value={values.provincia}
                          onChange={handleChange}
                        >
                          {errors.provincia && touched.provincia ? (
                            <div className="text-red-600">
                              {errors.provincia}
                            </div>
                          ) : null}
                        </Imput>

                        <Imput
                          nombreUsuario={"Localidad"}
                          name={"localidad"}
                          type="text"
                          value={values.localidad}
                          onChange={handleChange}
                        >
                          {errors.localidad && touched.localidad ? (
                            <div className="text-red-600">
                              {errors.localidad}
                            </div>
                          ) : null}
                        </Imput>
                      </>
                    )}
                  </div>
                </div>
                <div className="">
                {authErrors.map((error, i) => (
                  <div className="bg-red-600" key={i}>
                    {error}
                  </div>
                ))}
                <button
                  type="submit"
                  className="mb-5 hover:bg-[#ffff] font-bold bg-custom-green text-[#ffff] hover:text-custom-green p-2 rounded"
                >
                  Registrar
                </button>
              </div>
              </div>
              
            </Form>
          </article>
        )}
      </Formik>
    </section>
  );
};
