function HomePage() {
    const backgroundStyle = {
        backgroundImage: 'url(https://wallpaperaccess.com/full/767352.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    };

    return (
        <div style={backgroundStyle}>
            Welcome to Gourmet Delights Admin Portal
        </div>
    );
}

export default HomePage;
