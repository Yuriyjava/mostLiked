import AuthService from './../services/auth.service';
import { timingSafeEqual } from 'crypto';

export default class RegisterComponent {
    constructor() {
        this._authService = new AuthService();
    }

    render() {
        return `        
        <form name="register-form" novalidate>
            <h3>Sign up</h3>
            <div class="row">
                <div class="col-6">
                    <input class="form-control" type="text" placeholder="First name" id="first_name" required>
                </div>
                <div class="col-6">
                    <input class="form-control" type="text" placeholder="Last name" id="last_name" required>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col">
                    <input class="form-control" type="text" placeholder="Nickname" id="nickname" required>
                </div>
            </div>
            <h4 class="mt-3">Date of Birth</h5>
            <div class="row mt-2">
                <div class="col-4">
                    <select class="form-control" id="date_of_birth_day" required>
                        <option value="" disabled selected>Day</option>
                    </select>
                </div>
                <div class="col-4">
                    <select class="form-control" id="date_of_birth_month" required>
                        <option value="" disabled selected>Month</option>
                    </select>
                </div>
                <div class="col-4">
                    <select class="form-control" id="date_of_birth_year" required>
                        <option value="" disabled selected>Year</option>
                    </select>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-6">
                    <select class="form-control" id="country" required>
                        <option value="" disabled selected>Country</option>
                        <option value="Ukraine">Ukraine</option>
                    </select>
                </div>
                <div class="col-6">
                    <select class="form-control" id="city" required>
                        <option value="" disabled selected>City</option>
                        <option value="Kharkov">Kharkov</option>
                    </select>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col">
                    <select class="form-control" id="gender_orientation" required>
                        <option value="" disabled selected>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>            
            </div>
            <div class="row mt-4">
                <div class="col">
                    <input class="form-control" type="email" id="email" placeholder="Email address">
                </div>            
            </div>
            <div class="row mt-4">
                <div class="col">
                    <input class="form-control" type="phone" id="phone" placeholder="Phone number">
                </div>            
            </div>
            <div class="row mt-4">
                <div class="col">
                    <input class="form-control" type="password" id="password" placeholder="Pasword">
                </div>            
            </div>
            <div class="row mt-4">
                <div class="col">
                    <input class="form-control" type="password" id="re-password" placeholder="Repeat password">
                </div>            
            </div>
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </form>
        `
    }

    fillTemplate() {
        let dayFragment = document.createDocumentFragment();
        for(let i=1; i < 32; i++){
            let option = document.createElement("option");
            option.value = i;
            option.innerText = i;
            dayFragment.appendChild(option);
        }
        this.day.appendChild(dayFragment);

        let monthFragment = document.createDocumentFragment();
        for(let i=1; i<13; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.innerText = i;
            monthFragment.appendChild(option);
        }
        this.month.appendChild(monthFragment);

        let yearFragment = document.createDocumentFragment();
        for(let i=1900; i<2020; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.innerText = i;
            yearFragment.appendChild(option);
        }
        this.year.appendChild(yearFragment);
    }

    setElements() {
        this.form = document.forms["register-form"];
        this.day = this.form["date_of_birth_day"];
        this.month = this.form["date_of_birth_month"];
        this.year = this.form["date_of_birth_year"];
    }

    createUserForRegistration() {        
        return {
            email: this.form["email"].value,
            password: this.form["password"].value,
            nickname: this.form["nickname"].value,
            first_name: this.form["first_name"].value,
            last_name: this.form["last_name"].value,
            phone: this.form["phone"].value,
            gender_orientation: this.form["gender_orientation"].value,
            city: this.form["city"].value,
            country: this.form["country"].value,
            date_of_birth_day: this.form["date_of_birth_day"].value,
            date_of_birth_month: this.form["date_of_birth_month"].value,
            date_of_birth_year: this.form["date_of_birth_year"].value
        }
    }

    afterRender() {
        this.setElements();
        this.fillTemplate();
        this.form.addEventListener("submit", (e)=> {
            e.preventDefault();            
            const userData = this.createUserForRegistration();            
      
            this._authService.register(userData)
            .then((response) => {
                console.log(response);
                location.hash("/login");
            })
            .catch((error) => console.log(error));
          })
    }
}