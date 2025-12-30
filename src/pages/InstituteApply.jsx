import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Building, Phone, Mail, MapPin, User, FileText } from 'lucide-react'

const InstituteApply = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        instituteName: '',
        principalName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        instituteType: '',
        message: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log('Form submitted:', formData)
        alert('Application submitted successfully! We will contact you soon.')
        navigate('/')
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Header with Back Button */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back</span>
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                        Institute Registration Application
                    </h1>
                    <p className="text-slate-600">
                        Fill out the form below to register your institute with BTEB
                    </p>
                </div>

                {/* Application Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
                    {/* Institute Information */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Building className="w-5 h-5 text-purple-600" />
                            Institute Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Institute Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="instituteName"
                                    value={formData.instituteName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter institute name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Institute Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="instituteType"
                                    value={formData.instituteType}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="">Select type</option>
                                    <option value="technical">Technical Institute</option>
                                    <option value="polytechnic">Polytechnic</option>
                                    <option value="vocational">Vocational Training Center</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Principal Information */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-purple-600" />
                            Principal/Contact Person
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="principalName"
                                    value={formData.principalName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="01XXXXXXXXX"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-1" />
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="example@email.com"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Information */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-purple-600" />
                            Address Information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Full Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="House/Road/Area"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter city"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        District <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter district"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Message */}
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-600" />
                            Additional Information
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Message (Optional)
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                placeholder="Tell us more about your institute..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InstituteApply
