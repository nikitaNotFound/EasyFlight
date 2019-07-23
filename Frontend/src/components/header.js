import React, {Component} from "react";
import googleIcon from "../icons/google-icon.png";
import facebookIcon from "../icons/facebook-icon.png";

class Header extends Component {
    render() {
        return (
            <header class="rounded-bottom">
                <div class="row">
                    <div class="col-sm-8 col-lg-6">
                        <h1 class="display-4 company-icon">easy flight</h1>
                    </div>

                    
                    <div class="col-sm-4 col-lg-2" name="admin-panel" id="admin-panel">
                        
                    </div>

                    <div class="col-sm-12 col-lg-4">
                        <form class="form-inline pull-right login-bar">
                            <div class="input-group">
                                <input class="form-control login-item" name="email" id="email" placeholder="Email" />
                                <input class="form-control login-item" name="password" id="password" placeholder="Password" />
                                <div class="input-group-btn">
                                    <button type="submit" class="btn btn-primary button-dark login-item login-container">Login</button>
                                    <button type="submit" class="btn btn-primary button-dark login-container">
                                        <img src={googleIcon} class="login-item-img" />
                                    </button>
                                    <button type="submit" class="btn btn-primary button-dark login-container">
                                        <img src={facebookIcon} class="login-item-img" />
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div class="sing-up">
                            or <a href="">singup</a>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;