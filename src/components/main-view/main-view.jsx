import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [moviesSearch, setMoviesSearch] = useState("");
    

    useEffect(() => {
        if(!token) {
            return;
        }
    
        fetch("https://moviesdb-6abb3284c2fb.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
                const moviesApi = movies.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.title,
                        description: movie.description,
                        imagePath: movie.imagePath,
                        genre: movie.genre,
                        director: movie.director
                    };
                });
                setMovies(moviesApi);
            }).catch((e) => {
                console.log(e);
            });
    }, [token]);
    
    const onLoggedIn = (user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
    }
    const onLoggedOut = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    }
    const updatedUser = user => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }
    const onMoviesSearch = movies.filter((movie) =>
        movie.title.toLowerCase().includes(moviesSearch.toLocaleLowerCase())
    ); 
       
    
    
        return (
            <BrowserRouter>
            <NavigationBar 
                user={user} 
                onLoggedOut={onLoggedOut}
                moviesSearch={moviesSearch}
                setMoviesSearch={setMoviesSearch}
            />
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/"/>
                                    ) : (
                                        <Col md={5}>
                                            <LoginView 
                                                onLoggedIn={onLoggedIn} 
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )}
                                </>
                                }
                        />
                        <Route
                            path="/users/:Username"
                                element={
                                    <>
                                        {!user ? (
                                            <Navigate to="/login" replace />
                                        ) : (
                                            <Col md={5}>
                                                <ProfileView 
                                                    user={user}
                                                    token={token}
                                                    updatedUser={updatedUser}
                                                    onLoggedOut={onLoggedOut}
                                                />
                                            </Col>
                                        )}
                                    </>
                            }
                        />
                        <Route
                            path="/movies/:movieId"
                                element={
                                    <>
                                        {!user ? (
                                            <Navigate to="/login" replace />
                                            ) : movies.length === 0 ? (
                                                <Col>The list is empty</Col>
                                            ) : (    
                                                <Col md={8}>
                                                    <MovieView 
                                                    movies={movies}
                                                    user={user}
                                                    token={token}
                                                    setUser={setUser}  
                                                    />
                                                </Col>
                                        )}
                                    </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : onMoviesSearch.length === 0 ? (
                                        <Col>The list is empty</Col>
                                    ) : (
                                        <>
                                        {onMoviesSearch.map((movie) => (
                                            <Col
                                                className="mb-5"
                                                key={movie.id}
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                lg={4} >
                                                <MovieCard
                                                    movie={movie}
                                                />
                                            </Col>
                                        ))}
                                        </>
                                    )}
                                 </>
                            }
                        />
                    </Routes>
                </Row>
            </Container>
            </BrowserRouter>
        );
}
