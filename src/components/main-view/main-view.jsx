import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
    const [user, setUser] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        
    
        fetch("https://moviesdb-6abb3284c2fb.herokuapp.com/movies", {
            headers: { Authorization: 'Bearer ${token}' }
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
    }, []);
    
        return (
            <BrowserRouter>
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
                                            onLoggedIn={(user) => setUser(user)} />
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
                                path="/movies/:MovieID"
                                element={
                                    <>
                                        {!user ? (
                                            <Navigate to="/login" replace />
                                            ) : movies.length === 0 ? (
                                                <Col>The list is empty</Col>
                                            ) : (    
                                                <Col md={8}>
                                                    <MovieView movies={movies} />
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
                                            ) : movies.length === 0 ? (
                                                <Col>The list is empty</Col>
                                            ) : (
                                                <> 
                                                    {movies.map((movie) => (
                                                        <Col className="mb-5" key={movie.id} md={3}>
                                                            <MovieCard movie={movie}/>
                                                        </Col>
                                                    ))}
                                                </>
                                            )}
                                    </>
                                }
                            />      
                    </Routes>
                </Row>
            </BrowserRouter>
        );
};
