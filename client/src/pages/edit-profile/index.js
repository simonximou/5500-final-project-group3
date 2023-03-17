import "./edit-profile.css";
import Topbar from "../../components/topbar/Topbar";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
// import { Label, SettingsInputAntennaTwoTone } from "@material-ui/icons";
import {updateUser} from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";


export default function EditProfile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const { user: currentUser } = useContext(AuthContext);
  const username = currentUser.username;
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);


  const fullNameInput = useRef();
  const ageInput = useRef();
  const addressInput = useRef();
  const cityInput = useRef();
  const countryInput = useRef();
  const descInput = useRef();

  // update the user information on click
  const handleSubmit = async(event) => {
    event.preventDefault();

    const userInfo = {
      ...user,
      fullName: fullNameInput.current.value,
      age: ageInput.current.value,
      address: addressInput.current.value,
      city: cityInput.current.value,
      country: countryInput.current.value,
      desc: descInput.current.value,
    }
    console.log(userInfo);
    console.log(user._id);
    try {
      await axios.put(`/users/${user._id}`, userInfo);
      history.push(`/profile/${user.username}`);
    } catch (err) {
      console.log(err);
    }
  }




  return (
    <>
      <Topbar />
      <div className="main-content">
        {/* Header */}
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: 600,
            backgroundImage:
              "url(https://cdn.mos.cms.futurecdn.net/TFWk6Zp8rvbYangVbtQ9ek.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <div className="container-fluid d-flex align-items-center">
            <div className="row">
              <div className="col-lg-7 col-md-10">
                <a onClick={handleSubmit} className="btn btn-info">
                  Save profile
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Page content */}
        <div className="container-fluid mt--7">
          <div className="row">
            <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div className="card card-profile shadow">
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <a>
                        <img
                          src={user.profilePicture
                                             ? PF + user.profilePicture
                                             : PF + "person/noAvatar.png"}
                          className="rounded-circle"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">

                  </div>
                </div>
                <div className="card-body pt-0 pt-md-4">
                  <div className="row">
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3>
                      {user.username}
                      <span className="font-weight-light">,
                        {user.age != null ? (<span>{user.age}</span>) : (<span>mystery age</span>)}
                      </span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {user.city != null ? (<span>{user.city}, {user.country}</span>) : (<span>Mars</span>)}
                    </div>

                    <hr className="my-4" />
                    <p>
                      {user.desc != null ? (<span>{user.desc}</span>) : (<span>No information disclosed</span>)}
                    </p>

                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8 order-xl-1">
                <form onSubmit={handleSubmit}>
                  <div className="card bg-secondary shadow">
                    <div className="card-header bg-white border-0">
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h3 className="mb-0">My account</h3>
                        </div>
                        
                      </div>
                    </div>
                    <div className="card-body">
                      <form>
                        <h6 className="heading-small text-muted mb-4">
                          User information
                        </h6>
                        <div className="pl-lg-4">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Username
                                </label>
                                <input
                                  readOnly
                                  type="text"
                                  id="input-username"
                                  className="form-control form-control-alternative"
                                  placeholder="Username"
                                  defaultValue={user.username}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-email"
                                >
                                  Email address
                                </label>
                                <input
                                  readOnly
                                  type="email"
                                  id="input-email"
                                  className="form-control form-control-alternative"
                                  defaultValue={user.email}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-first-name"
                                >
                                  Full name
                                </label>
                                <input
                                  type="text"
                                  id="input-first-name"
                                  className="form-control form-control-alternative"
                                  placeholder="Full name"
                                  defaultValue={user.fullName}
                                  ref={fullNameInput}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-last-name"
                                >
                                  Age
                                </label>
                                <input
                                  type="number"
                                  id="input-last-name"
                                  className="form-control form-control-alternative"
                                  placeholder="Age"
                                  defaultValue={user.age}
                                  ref={ageInput}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">
                          Contact information
                        </h6>
                        <div className="pl-lg-4">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Address
                                </label>
                                <input
                                  id="input-address"
                                  className="form-control form-control-alternative"
                                  placeholder="Home Address"
                                  defaultValue={user.address}
                                  type="text"
                                  ref={addressInput}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-city"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  id="input-city"
                                  className="form-control form-control-alternative"
                                  placeholder="City"
                                  defaultValue={user.city}
                                  ref={cityInput}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">
                              <div className="form-group focused">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-country"
                                >
                                  Country
                                </label>
                                <input
                                  type="text"
                                  id="input-country"
                                  className="form-control form-control-alternative"
                                  placeholder="Country"
                                  defaultValue={user.country}
                                  ref={countryInput}
                                />
                              </div>
                            </div>
                            <div className="col-lg-4">

                            </div>
                          </div>
                        </div>
                        <hr className="my-4" />
                        {/* Description */}
                        <h6 className="heading-small text-muted mb-4">About me</h6>
                        <div className="pl-lg-4">
                          <div className="form-group focused">
                            <label>About Me</label>
                            <textarea
                              rows={4}
                              className="form-control form-control-alternative"
                              placeholder="A few words about you ..."
                              defaultValue={user.desc}
                              ref={descInput}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <a onClick={handleSubmit} className="btn btn-info align-middle ms-3 mt-3 mb-3 text-color:white">
                    Save profile
                  </a>
                </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
  
}




// HTML&CSS source: https://www.creative-tim.com/bits/bootstrap/user-profile-page-argon-dashboard
// credit to: Creative Tim


// before styling, old code

// return (
//   <>
//     <Topbar />
//     <div className="edit-profile">
//       <h1>Replace Side bar with Ads Location</h1>
//       <div className="edit-profileRight">
//         <div className="edit-profileRightTop">
//           <div className="edit-profileCover">
//             <img
//               className="edit-profileCoverImg"
//               src={
//                 PF + "person/star-sign-cover.png"
//               }
//               alt="profileCover image not found"
//             />
//             <img
//               className="edit-profileUserImg"
//               src={
//                 user.profilePicture
//                   ? PF + user.profilePicture
//                   : PF + "person/noAvatar.png"
//               }
//               alt="profileUser image not found"
//             />
//           </div>

//         </div>
//         <div className="edit-profileRightBottom">
//           <div className="edit-profile-form">

//             <form onSubmit={handleSubmit}>
//               <label>Update your username: 
//                 <input 
//                   type="text" 
//                   // link the input field to ref
//                   ref={usernameInput}
//                 />
//               </label>

//               <br></br>
//               <br></br>

//               <label>Update your email: 
//                 <input 
//                   type="text" 
//                   ref={emailInput}
//                 />
//               </label>

//               <br></br>
//               <br></br>
//               <label>Update your password: 
//                 <input 
//                   type="text" 
//                   ref={passwordInput}
//                 />
//               </label>
//               <br></br>
//               <br></br>

//               <label for="gender"> Update your gender: 
//                 <select name="gener" id="gener" ref={genderInput}>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="transgender">Transgender</option>
//                   <option value="hide">Prefer not to respond</option>
//                 </select>
//               </label>
//               <br></br>
//               <br></br>
//               <input type="submit" value="Save" />
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
// );