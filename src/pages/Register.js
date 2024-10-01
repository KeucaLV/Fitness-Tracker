import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import logo from "../images/logo.png";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success('Registration successful!');
                reset();
            } else {
                const errorData = await response.json();
                console.log(errorData.message);
                toast.error(errorData.message || 'Registration failed.');
            }
        } catch (error) {
            toast.error('An error occurred while submitting the form.');
        }
    };


    const handleError = (errors) => {
        Object.keys(errors).forEach((errorKey) => {
            const message = errors[errorKey]?.message;
            if (message) {
                toast.error(message);
            }
        });
    };

    return (
        <>
            <div className="flex w-screen bg-[#000000] font-montserrat flex-row h-screen overflow-hidden justify-center items-center">
                <div className="flex w-1/2 justify-center items-center h-full ml-28 m-2 mt-2 mb-2 max-desktop:ml-[73px]">
                    <div className="flex w-[450px] p-5 h-3/4 justify-center items-center flex-col rounded-2xl max-desktop:w-[300px] max-desktop:p-0 max-desktop:-ml-16">
                        <img className="w-[60px] mb-2" src={logo} alt="Logo" />
                        <h1 className="text-2xl mb-3 text-white">Create account</h1>
                        <div className="flex flex-row">
                            <p className="text-white mb-5">Already have an account? </p>
                            <Link to="/login" className="text-blue-500 ml-1 hover:cursor-pointer">
                                Sign in
                            </Link>
                        </div>
                        <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit, handleError)}>
                            <div className="flex flex-row justify-center items-center max-desktop:flex-col max-desktop:w-[300px]">
                                <input
                                    className="m-1 p-2 text-white placeholder-gray-400 w-[198px] bg-gray-800 rounded-md max-desktop:w-full"
                                    placeholder="First name"
                                    {...register("firstname", {
                                        required: "First name is required",
                                    })}
                                />
                                <input
                                    className="m-1 p-2 text-white placeholder-gray-400 w-[198px] bg-gray-800 rounded-md max-desktop:w-full"
                                    placeholder="Last name"
                                    {...register("lastname", {
                                        required: "Last name is required",
                                    })}
                                />
                            </div>
                            <div className="flex flex-row justify-center items-center max-desktop:flex-col max-desktop:w-[300px]">
                                <input
                                    className="m-1 p-2 text-white placeholder-gray-400 w-[198px] bg-gray-800 rounded-md max-desktop:w-full"
                                    placeholder="Email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Enter a valid email",
                                        },
                                    })}
                                />
                                <input
                                    className="m-1 p-2 text-white placeholder-gray-400 w-[198px] bg-gray-800 rounded-md max-desktop:w-full"
                                    placeholder="Username"
                                    {...register("username", {
                                        required: "Username is required",
                                    })}
                                />
                            </div>
                            <input
                                className="m-1 p-2 text-white placeholder-gray-400 bg-gray-800 rounded-md w-[402px] max-desktop:w-[300px]"
                                placeholder="Password"
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                            />
                            <input
                                className="m-1 p-2 text-white placeholder-gray-400 bg-gray-800 rounded-md w-[402px] max-desktop:w-[300px]"
                                placeholder="Confirm Password"
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value, context) =>
                                        value === context.password || "Passwords do not match",
                                })}
                            />
                            <button
                                type="submit"
                                className="flex w-[402px] ml-1 m-2 font-montserrat text-white p-2 rounded-md justify-center bg-blue-600 hover:bg-blue-700 min-tablet:w-[300px]"
                            >
                                Sign up with email
                            </button>
                            <div className="flex flex-row flex-wrap w-[402px] mt-2 ml-1 items-center justify-start text-wrap max-desktop:w-[300px]">
                                <input
                                    className="form-checkbox h-4 w-4 text-gray-600 bg-gray-800 border-gray-700 focus:ring-2 focus:ring-blue-600 focus:outline-none rounded"
                                    type="checkbox"
                                    {...register("terms", {
                                        required: "You must agree to the terms and privacy policy",
                                    })}
                                />
                                <p className="text-white text-sm font-montserrat m-1">I agree to the </p>
                                <Link to="/terms" className="text-blue-500 text-sm font-montserrat hover:cursor-pointer">Terms of Service</Link>
                                <p className="text-white text-sm font-montserrat m-1"> and </p>
                                <Link to="/privacy" className="text-blue-500 text-sm font-montserrat hover:cursor-pointer">Privacy Policy</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex absolute flex-col w-[600px]  z-10 bottom-[30%] right-10 max-desktop:hidden">
                    <h2 className="text-white text-2xl mb-3 font-montserrat font-bold">
                        Transform Your Body, Elevate Your Life!
                    </h2>
                    <h2 className="text-white text-sm mb-3 font-montserrat font-medium">
                        Welcome to your ultimate fitness hub! Build muscle, burn fat, or boost your health with our personalized meal planner,
                        targeted exercises, activity calendar, and competitive leaderboard.
                    </h2>

                </div>
                <div className="flex w-[900px] h-full max-desktop:hidden">
                    <svg
                        className="flex relative w-[1500px] h-[1200px] -right-2 -top-[250px]"
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 400 500"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <clipPath id="clip-shape">
                                <path
                                    d="M367.8229675292969,107.11722564697266C333.13397216796875,100.53827794392903,315.19138590494794,84.53947448730469,285.2870788574219,82.89473724365234C255.38277180989584,81.25,215.3110008239746,92.31459172566731,188.39712524414062,97.2488021850586C161.48324966430664,102.18301264444987,138.00837071736655,101.43540573120117,123.80382537841797,112.5C109.5992800394694,123.56459426879883,111.39353688557942,147.18899790445963,103.16985321044922,163.63636779785156C94.94616953531902,180.0837376912435,68.48086166381836,192.49402618408203,74.46172332763672,211.18421936035156C80.44258499145508,229.8744125366211,137.41028594970703,255.74164072672525,139.05502319335938,275.77752685546875C140.69976043701172,295.8134129842122,84.18062591552734,316.59690856933594,84.33014678955078,331.3995361328125C84.47966766357422,346.20216369628906,142.3444938659668,350.6877899169922,139.9521484375,364.5932922363281C137.5598030090332,378.49879455566406,84.330140431722,399.7308756510417,69.97607421875,414.8325500488281C55.62200800577799,429.93422444661456,53.678229014078774,440.55023193359375,53.82775115966797,455.2033386230469C53.977273305257164,469.8564453125,62.05143610636393,492.7332407633464,70.87320709228516,502.7511901855469C79.69497807820638,512.7691396077474,94.34808985392253,512.0215606689453,106.75837707519531,515.31103515625C119.1686642964681,518.6005096435547,120.96292114257812,519.1985677083334,145.33493041992188,522.488037109375C169.70693969726562,525.7775065104166,206.78827921549478,531.4593302408854,252.9904327392578,535.0478515625C299.1925862630208,538.6363728841146,378.88756561279297,545.215342203776,422.5478515625,544.0191650390625C466.20813751220703,542.822987874349,497.0095621744792,551.9437611897787,514.9521484375,527.8707885742188C532.8947347005209,503.7978159586589,548.1459503173828,429.0370686848958,530.203369140625,399.5813293457031C512.2607879638672,370.12559000651044,423.74403381347656,375.6578826904297,407.2966613769531,351.1363525390625C390.8492889404297,326.6148223876953,414.77272542317706,282.6554946899414,431.5191345214844,252.4521484375C448.2655436197917,222.2488021850586,497.4581298828125,191.59689585367838,507.7751159667969,169.91627502441406C518.0921020507812,148.23565419514975,516.7464090983073,132.83493169148764,493.4210510253906,122.36842346191406C470.09569295247394,111.9019152323405,402.511962890625,113.69617335001628,367.8229675292969,107.11722564697266C333.13397216796875,100.53827794392903,315.19138590494794,84.53947448730469,285.2870788574219,82.89473724365234"
                                />
                            </clipPath>
                        </defs>
                        <image
                            className="brightness-50"
                            x="0"
                            y="0"
                            width="130%"
                            height="110%"
                            xlinkHref="https://longevity.technology/lifestyle/wp-content/uploads/2023/07/man-weightlifting-while-standing-at-gym.jpg"
                            clipPath="url(#clip-shape)"
                        />
                    </svg>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default Register;
