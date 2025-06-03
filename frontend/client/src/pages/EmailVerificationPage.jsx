import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
const EmailVerificationPage = () => {
const [code, setCode] = useState(["", "", "", "", ""])
const inputRefs = useRef([])
const navigate = useNavigate();
  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
       <motion.div
    initial={{ opacity: 0, y: -50 }}
	animate={{ opacity: 1, y: 0 }}
	transition={{ duration: 0.5 }}
	className='bg-gray-800 bg-opacity-backdrop-filter backdrop-blur-xl rounded-2shadow-2xl p-8 w-full max-w-md'
       >
    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Verify Your Email
	</h2>
	<p className='text-center text-gray-300 mb-6'>Enter the 6-digit code sent to your email address.</p>
    <form className="space-y-6">
<div className="flex justify-between">

</div>
    </form>
        </motion.div>
        </div>
  )
}

export default EmailVerificationPage