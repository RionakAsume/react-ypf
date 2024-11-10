
interface ImputProps {
    nombreUsuario: string;
    name: string;
    type: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const Imput: React.FC<ImputProps> = ({ nombreUsuario, name, type, value, onChange, children }) => {
    return (
        <div className=" flex flex-col">
            <input
                placeholder={nombreUsuario}
                className="placeholder-custom-blue p-2 h-[40px] rounded-[5px] my-3"
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                autoComplete="off"
            />
            {children}
        </div>
    )
}

export default Imput