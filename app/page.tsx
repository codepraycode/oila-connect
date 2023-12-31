'use client';
import { useEffect, useState } from 'react';
import MemberCard from '@components/Member';
import styles from '@styles/page.module.css';
import { IMember } from '@models/member';
import { LoadingMembers } from '@components/Loaders';
import { NetworkError, PassiveError } from '@components/errors';
import { PayloadError } from '@utils/types';

export default function Home() {

	const [members, setMembers] = useState<IMember[]>([]);
	const [error, setError] = useState<PayloadError | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(()=>{
		(async ()=>{
			if (members.length > 1) {
				// console.log("False load")
				return
			}
			const res = await fetch('/api/members');
			const res_data = await res.json()
			// console.log(JSON.stringify(data, null, 4));

			if (res_data.status === 200) {
				setMembers(()=>res_data.data);
			}else if (res_data.error){
				// console.log("Error loading members")
				setError(()=>res_data.error);
			}
			// setMembers(()=>res_data.status === 200 ? res_data.data : [])

			setLoading(false);
		})()
	},[loading, members, error]);


	const reload= () => {
		setError(null);
		setLoading(true)
		if (members?.length >= 1) setMembers(()=>[])
	}


	let template = <LoadingMembers/>;
	
	if (error) template = <NetworkError 
			message={error.message}
			title={error.code}
			reload={reload}
		/>
    else if (!loading) template = members.length < 1 ? 
		<PassiveError 
			title='No Members!'
			icon="/users.svg"
			message='No members registered yet!'
			ctaText='Load again'
			reload={reload}
		/> : <MemberCard members={members}/>;
		
	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<h1>
					Oila connect |&nbsp;
					<a href="/" className={styles.nav}>
						About
					</a>
				</h1>

				<div>
					<span className={styles.credit}>
						By{' '}
						<h4>codepraycode</h4>
					</span>
				</div>
			</div>

			<>
				{
					// members ? <MemberCard members={members}/> : <LoadingMembers/>
					// <MemberCard members={[]}/>
					template
				}
			</>
		</main>
	)
}
