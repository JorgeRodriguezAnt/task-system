

export default function Login() {
  
  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
	<div className="mb-8 text-center">
		<h1 className="my-3 text-4xl font-bold">Sign in</h1>
	</div>
	<form noValidate="" action="" className="space-y-12">
		<div className="space-y-4">
			<div>
				<label htmlFor="email" className="block mb-2 text-sm">Email</label>
				<input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
			</div>
			<div>
				<div className="space-y-4">
					<label htmlFor="password" className="block mb-2 text-sm ">Password</label>
					
				</div>
				<input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
			</div>
		</div>
		<div className="space-y-2">
			<div>
				<button type="button" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">Sign in</button>
			</div>
			
		</div>
	</form>
</div>
  );
}
