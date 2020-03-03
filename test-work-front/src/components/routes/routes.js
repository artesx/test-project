import React from 'react';
import { Switch, Route } from "react-router-dom";
import {
    LoginPage,
    RegisterPage,
    PostsPage,
    PersonalPage,
    CreatePostPage,
    UpdatePostPage,
    PostPage
} from '../../pages';
import ProtectedRoute from '../protected-route';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={PostsPage} exact />
            <Route path="/posts" component={PostsPage} exact/>
            <Route path="/posts/:id" component={PostPage} />
            <ProtectedRoute path="/personal" component={PersonalPage} />
            <ProtectedRoute path="/create-post" component={CreatePostPage} />
            <ProtectedRoute path="/update-post/:id" component={UpdatePostPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </Switch>
    )
}

export default Routes;