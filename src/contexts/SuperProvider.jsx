import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";

function SuperProvider(props) {
    const { children } = props;
    return (
        <AuthProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
    );
}

export default SuperProvider;
