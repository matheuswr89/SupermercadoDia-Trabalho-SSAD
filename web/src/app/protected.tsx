import { redirect } from "next/navigation";
import { useContext, useEffect } from 'react';
import AuthContext from './context/AuthContext';

const ProtectedRoute = ({ children }: any) => {
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (!user || !user.perfil && user.perfil !== "administrador") {
          redirect('/');
        }
    }, [user]);

    return <>{children}</>;
};

export default ProtectedRoute;