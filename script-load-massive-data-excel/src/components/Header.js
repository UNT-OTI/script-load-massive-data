const Header = () => {
    return ( 
        <div className="my-10 text-center">
            <h3 className="text-3xl text-gray-900 dark:text-white">
                <span className="bg-gradient-to-r to-emerald-600 from-sky-400 bg-clip-text text-transparent">
                    <b>UNT |</b>
                </span>{" "}
                SCRIPT LOAD APP
            </h3>
            <p className="mt-4 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Esta app permite cargar data de un excel en una escuela determinada en la BD de: <strong>sistemabib</strong>                
            </p>
            <p className="text-slate-500 text-sm mt-3">
                Nota: Solicitar credenciales para acceder a esta bd
            </p>
        </div>
    );
};

export default Header;

// DB_NAME=sistemabib
// DB_USER=ablas
// DB_PASSWORD='Un1tru#2@24'
// DB_HOST=192.168.11.210
// DB_DIALECT=mysql
// PORT=5000

