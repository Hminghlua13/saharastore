import React from 'react';

function NoPage() {
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Oops! Page Not Found</h2>
            <p style={styles.text}>We're sorry, but the page you are looking for does not exist.</p>
            <p style={styles.text}>Please check the URL or go back to the <a href="/" style={styles.link}>homepage</a>.</p>
            <div style={styles.imageContainer}>
                <img src="https://scontent.fshl2-1.fna.fbcdn.net/v/t1.18169-9/16114049_254406138323213_5511396339717927287_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rtddjCEUC-8Ab7cePBC&_nc_ht=scontent.fshl2-1.fna&oh=00_AfBJfkzABoSH-EWEfIqYnTeSKJJvqj3JkbIgFaQ8QYqKNA&oe=6652C294" alt="Page not found" style={styles.image} />
            </div>
        </div>
    );
}
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    heading: {
        color: '#D62905',
        fontSize: '36px',
        fontWeight: 'bold',
    },
    text: {
        color: '#666',
        marginBottom: '10px',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    image: {
        maxWidth: '500%',
        width: '700px',
        height: 'auto', 
    },
};

export default NoPage;
