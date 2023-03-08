import "./App.css";
import "./assets/scss/global.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-date-range/dist/styles.css'; // main style file date picker
import 'react-date-range/dist/theme/default.css'; // theme css file date picker

import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import { HomePage } from "./views/HomePage";
import { AdminSpaEdit } from "./views/AdminSpaEdit";
import { AppHeader } from "./cmps/AppHeader";
import { Admin } from "./views/Admin";
import { SpaDetails } from "./views/SpaDetails";
import { SpaDetailsServices } from "./views/SpaDetailsServices";
import { SpaDetailsAbout } from "./views/SpaDetailsAbout";
import { SpaDetailsReviews } from "./views/SpaDetailsReviews";
import { AdminSpaEditPack } from "./views/AdminSpaEditPack";
import { AppFooter } from "./cmps/AppFooter";
import { Search } from "./views/Search";
import { AdminSpaSearch } from "./views/AdminSpaSearch";
import { UserMsg } from "./cmps/UserMsg";
import { AdminLabelEditPage } from "./views/AdminLabelEditPage";
import { AdminLabelSearch } from "./views/AdminLabelSearch";
import { LogIn } from "./views/LogIn";
// const Search = lazy(() => import("./views/Search"));

function App() {

  return (
    <Router>
      <div className="App main-layout">
        <header className="App-header full main-layout">
          <AppHeader />
        </header>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<Search isLabelSearch={true} />} path="/:labelUrl?" />
              <Route element={<Search />} path={"/search"} />
              <Route element={<LogIn />} path="/login" />
              <Route element={<Admin />} path="/admin">
                <Route element={<AdminSpaSearch />} path="" />
                <Route element={<AdminSpaEdit />} path="add" />
                <Route element={<AdminSpaEdit />} path="edit/:id" />
                <Route element={<AdminSpaEditPack />} path="packs" />
                <Route element={<AdminLabelSearch />} path="label" />
                <Route element={<AdminLabelEditPage />} path="label/add" />
                <Route element={<AdminLabelEditPage />} path="label/edit/:id" />
              </Route>
              <Route element={<SpaDetails />} path="/spa/:id">
                <Route element={<SpaDetailsServices />} path="" />
                <Route element={<SpaDetailsAbout />} path="about" />
                <Route element={<SpaDetailsReviews />} path="reviews" />
              </Route>
            </Routes>
          </Suspense>
        <footer className="App-footer full sec-top-margin">
          <AppFooter />
        </footer>
        <UserMsg/>
      </div>
    </Router>
  );
}

export default App;
