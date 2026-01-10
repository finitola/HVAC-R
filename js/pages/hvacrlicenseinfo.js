export function HVACRLicenseInfo() {
	return `
<div class="card">
	<h3 class="card__title">ზოგადი ინფორმაცია</h3>
	<p class="card__description">
		აქ მოცემული ინფორმაცია აღებულია ტესტებიდან (206 კითხვა) და განკუთვნილია
		ინფორმაციის მარტივად მოსაძიებლად და დასამახსოვრებლად.
	</p>
</div>
<div class="kb-wrapper">
	<div class="kb-card">
		<h2>1. მაცივარაგენტების კლასიფიკაცია</h2>
		<div class="kb-table-responsive">
			<table class="kb-table">
				<thead>
					<tr>
						<th>ჯგუფი</th>
						<th>განმარტება</th>
						<th>მაგალითები</th>
						<th>ODP (ოზონი)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><span class="kb-badge kb-badge-sub">ქფნ (CFC)</span></td>
						<td>ქლორფტორნახშირბადები</td>
						<td>R12</td>
						<td class="kb-highlight">მაღალი</td>
					</tr>
					<tr>
						<td><span class="kb-badge kb-badge-sub">წქფნ (HCFC)</span></td>
						<td>წყალბადქლორფტორნახშირბადები</td>
						<td>R22</td>
						<td class="kb-highlight">საშუალო</td>
					</tr>
					<tr>
						<td><span class="kb-badge kb-badge-sub">წფნ (HFC)</span></td>
						<td>წყალბადფტორნახშირბადები</td>
						<td>R134a, R410A</td>
						<td>ნულოვანი</td>
					</tr>
					<tr>
						<td><span class="kb-badge kb-badge-sub">HC</span></td>
						<td>ბუნებრივი აირები</td>
						<td>R600a, R290</td>
						<td>ნულოვანი</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3>უსაფრთხოების ჯგუფები</h3>
		<div class="kb-safety-grid">
			<div class="kb-safety-item kb-border-green">
				<span class="kb-badge kb-bg-green">A1</span>
				<p>
					<strong>არატოქსიკური, არააალებადი</strong><br />R22, R134a, R410A,
					R744
				</p>
			</div>
			<div class="kb-safety-item kb-border-orange">
				<span class="kb-badge kb-bg-orange">A2L</span>
				<p><strong>დაბალი აალებადობა</strong><br />R1234yf</p>
			</div>
			<div class="kb-safety-item kb-border-red">
				<span class="kb-badge kb-bg-red">A3</span>
				<p><strong>მაღალი აალებადობა</strong><br />R600a, R290</p>
			</div>
			<div class="kb-safety-item kb-border-blue">
				<span class="kb-badge kb-bg-blue">B2</span>
				<p><strong>ტოქსიკური, აალებადი</strong><br />R717 (ამიაკი)</p>
			</div>
		</div>
	</div>

	<div class="kb-card">
		<h2>2. ჯარიმები და კანონმდებლობა</h2>
		<div class="kb-table-responsive">
			<table class="kb-table">
				<thead>
					<tr>
						<th>დარღვევის ტიპი</th>
						<th>ჯარიმა (ლარი)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>ელექტრონული სისტემის წარმოების წესის დარღვევა</td>
						<td class="kb-highlight">500 ₾</td>
					</tr>
					<tr>
						<td>ტექნიკური რეგლამენტის ზოგადი დარღვევა</td>
						<td class="kb-highlight">1000 ₾</td>
					</tr>
					<tr>
						<td>არასერტიფიცირებული პირი (მომსახურება)</td>
						<td>
							ფიზიკური: <strong>400</strong> / იურიდიული: <strong>1000</strong>
						</td>
					</tr>
					<tr>
						<td>განმეორებითი დარღვევა</td>
						<td>
							ფიზიკური: <strong>800</strong> / იურიდიული: <strong>2000</strong>
						</td>
					</tr>
					<tr>
						<td>ნივთიერების უკანონო შეძენა/გასხვისება</td>
						<td><strong>150 ₾</strong> (თითო კილოგრამზე)</td>
					</tr>
				</tbody>
			</table>
		</div>
		<ul class="kb-list">
			<li><strong>R22 შეზღუდვა:</strong> სრულად იკრძალება 2030 წელს.</li>
			<li>
				<strong>კიგალის დანართი:</strong> არეგულირებს HFC-ების შემცირებას.
			</li>
			<li><strong>სერტიფიკატი:</strong> გაიცემა 5 წლის ვადით.</li>
		</ul>
	</div>

	<div class="kb-card">
		<h2>3. ტექნიკური მომსახურების ინტერვალები</h2>
		<p style="margin-bottom: 15px; color: #666">
			გაჟონვაზე შემოწმების სავალდებულო პერიოდულობა:
		</p>
		<div class="kb-table-responsive">
			<table class="kb-table">
				<thead>
					<tr>
						<th>მაცივარაგენტის რაოდენობა</th>
						<th>შემოწმების სიხშირე</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>3 კგ - 30 კგ</td>
						<td><span class="kb-badge kb-bg-green">12 თვეში ერთხელ</span></td>
					</tr>
					<tr>
						<td>30 კგ - 300 კგ</td>
						<td><span class="kb-badge kb-bg-orange">6 თვეში ერთხელ</span></td>
					</tr>
					<tr>
						<td>300 კგ და მეტი</td>
						<td><span class="kb-badge kb-bg-red">3 თვეში ერთხელ</span></td>
					</tr>
				</tbody>
			</table>
		</div>
		<p style="font-size: 0.9rem; color: #666; margin-top: 10px">
			ℹ️
			<em
				>შენიშვნა: ჟურნალის წარმოება სავალდებულოა, თუ სისტემა შეიცავს 3 კგ-ზე
				მეტ მაცივარაგენტს.</em
			>
		</p>
	</div>

	<div class="kb-card">
		<h2>4. უსაფრთხოების ნორმები და ზღვრები</h2>
		<div class="kb-table-responsive">
			<table class="kb-table">
				<thead>
					<tr>
						<th>მაცივარაგენტი</th>
						<th>პრაქტიკული ნორმა (კგ/მ³)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>R134a</td>
						<td>0.25</td>
					</tr>
					<tr>
						<td>R744 (CO₂)</td>
						<td>0.07</td>
					</tr>
					<tr>
						<td>R290 (პროპანი)</td>
						<td>0.008</td>
					</tr>
					<tr>
						<td>R717 (ამიაკი)</td>
						<td>0.00035</td>
					</tr>
				</tbody>
			</table>
		</div>
		<ul class="kb-list">
			<li><strong>ვენტილაცია:</strong> მინიმუმ 4-ჯერადი ცვლა საათში.</li>
			<li>
				<strong>ცხელი ზედაპირი:</strong> სხვაობა თვითაალების ტემპერატურამდე
				მინიმუმ 150°C.
			</li>
			<li><strong>ბალონის შევსება:</strong> უსაფრთხო ნორმაა 80%.</li>
			<li><strong>დეტექტორი (A2/A3):</strong> განგაში LFL-ის 20%-ზე.</li>
		</ul>
	</div>

	<div class="kb-card" style="border-left-color: #fd7e14">
		<h2 style="color: #fd7e14">5. ტექნიკური რჩევები (Best Practices)</h2>
		<ul class="kb-list">
			<li>
				<strong>ვაკუუმირება:</strong> ტენის მოსაშორებლად საჭიროა ვაკუუმის 24
				საათით შენარჩუნება.
			</li>
			<li><strong>ჰერმეტულობის ტესტი:</strong> გამოიყენება მშრალი აზოტი.</li>
			<li>
				<strong>ზეთი:</strong> R134a-სთვის გამოიყენება პოლიეთერული (POE) ზეთი.
			</li>
			<li>
				<strong>ზეოტროპული ნარევი:</strong> იტვირთება მხოლოდ სითხის სახით.
			</li>
			<li><strong>რეციკლირება:</strong> მინარევი არ უნდა აღემატებოდეს 2%-ს.</li>
		</ul>
	</div>
</div>

`
}
