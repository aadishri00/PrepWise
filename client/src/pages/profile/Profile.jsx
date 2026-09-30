import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";


function Profile() {

    const [profile, setProfile] = useState(null);

    const [edit, setEdit] = useState(false);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        skills: ""
    });


    useEffect(() => {
        loadProfile();
    }, []);


    const loadProfile = async () => {

        try {

            const res = await api.get("/profile");

            const user = res.data.user || res.data;

            setProfile(user);


            let skills = "";

            if (Array.isArray(user.skills)) {
                skills = user.skills.join(", ");
            } else if (typeof user.skills === "string") {
                skills = user.skills;
            }


            setForm({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                college: user.college || "",
                skills: skills
            });

        } catch (error) {

            console.log("Profile error:", error);

        } finally {

            setLoading(false);

        }
    };


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const updateProfile = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);

            const res = await api.put(
                "/profile",
                form
            );

            const user = res.data.user;


            let skills = "";

            if (Array.isArray(user.skills)) {
                skills = user.skills.join(", ");
            } else if (typeof user.skills === "string") {
                skills = user.skills;
            }


            setProfile(user);

            setForm({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                college: user.college || "",
                skills: skills
            });

            setEdit(false);

            alert("Profile updated successfully");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Profile update failed"
            );

        } finally {

            setSaving(false);

        }
    };


    const getSkills = () => {

        if (!profile?.skills) {
            return [];
        }

        if (Array.isArray(profile.skills)) {
            return profile.skills;
        }

        if (typeof profile.skills === "string") {
            return profile.skills
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean);
        }

        return [];
    };


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <p>
                    Loading profile...
                </p>

            </div>
        );

    }


    if (!profile) {

        return (
            <div className="min-h-screen flex items-center justify-center">

                <p>
                    Unable to load profile.
                </p>

            </div>
        );

    }


    return (

        <div className="min-h-screen bg-gray-50">

            <Navbar />


            <main className="max-w-5xl mx-auto p-6">


                {/* HEADER */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold">
                            My Profile
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Manage your personal and professional information.
                        </p>

                    </div>


                    {!edit && (

                        <button
                            onClick={() => setEdit(true)}
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
                        >
                            Edit Profile
                        </button>

                    )}

                </div>



                {/* EDIT PROFILE */}

                {edit ? (

                    <form
                        onSubmit={updateProfile}
                        className="bg-white rounded-xl shadow p-7"
                    >

                        <h2 className="text-xl font-bold mb-6">
                            Edit Profile
                        </h2>


                        <div className="grid md:grid-cols-2 gap-5">


                            <Input
                                label="Full Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />


                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />


                            <Input
                                label="Phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />


                            <Input
                                label="College"
                                name="college"
                                value={form.college}
                                onChange={handleChange}
                                placeholder="Enter college name"
                            />

                        </div>


                        <div className="mt-5">

                            <label className="block font-medium mb-2">
                                Skills
                            </label>


                            <textarea
                                name="skills"
                                value={form.skills}
                                onChange={handleChange}
                                placeholder="Java, React, Node.js, MongoDB..."
                                rows="4"
                                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        <div className="flex gap-3 mt-6">


                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg disabled:opacity-50"
                            >

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"
                                }

                            </button>


                            <button
                                type="button"
                                onClick={() => setEdit(false)}
                                className="border px-6 py-2.5 rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                ) : (


                    /* PROFILE VIEW */

                    <div className="bg-white rounded-xl shadow overflow-hidden">


                        {/* PROFILE HEADER */}

                        <div className="bg-gray-900 text-white p-7">

                            <div className="flex items-center gap-5">


                                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">

                                    {profile.name
                                        ?.charAt(0)
                                        ?.toUpperCase()
                                    }

                                </div>


                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {profile.name}
                                    </h2>


                                    <p className="text-gray-300 mt-1">
                                        {profile.email}
                                    </p>


                                    <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-sm mt-3">

                                        {profile.role === "admin"
                                            ? "Admin"
                                            : "Software Developer"
                                        }

                                    </span>

                                </div>

                            </div>

                        </div>



                        {/* PERSONAL INFORMATION */}

                        <div className="p-7">

                            <h2 className="text-xl font-bold mb-5">
                                Personal Information
                            </h2>


                            <div className="grid md:grid-cols-2 gap-5">


                                <Info
                                    label="Full Name"
                                    value={profile.name}
                                />


                                <Info
                                    label="Email"
                                    value={profile.email}
                                />


                                <Info
                                    label="Phone"
                                    value={profile.phone}
                                />


                                <Info
                                    label="College"
                                    value={profile.college}
                                />

                            </div>



                            {/* SKILLS */}

                            <div className="mt-6">

                                <p className="text-sm text-gray-500 mb-2">
                                    Technical Skills
                                </p>


                                <div className="border rounded-lg p-4">


                                    {getSkills().length > 0 ? (

                                        <div className="flex flex-wrap gap-2">

                                            {getSkills().map(
                                                (skill, index) => (

                                                    <span
                                                        key={index}
                                                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {skill}
                                                    </span>

                                                )
                                            )}

                                        </div>

                                    ) : (

                                        <p className="text-gray-400">
                                            No skills added yet.
                                        </p>

                                    )}

                                </div>

                            </div>


                        </div>

                    </div>

                )}

            </main>

        </div>
    );
}



function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required
}) {

    return (

        <div>

            <label className="block font-medium mb-2">
                {label}
            </label>


            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>

    );
}



function Info({
    label,
    value
}) {

    return (

        <div className="border rounded-lg p-4">

            <p className="text-sm text-gray-500">
                {label}
            </p>


            <p className="font-semibold mt-1">
                {value || "Not added"}
            </p>

        </div>

    );
}


export default Profile;