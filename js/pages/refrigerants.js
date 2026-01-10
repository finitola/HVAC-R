export function RefrigerantsPage() {
	return `
<div class="card">
	<h3 class="card__title">მაცივარაგენტები - Refrigerants</h3>
	<p class="card__description">
		მაცივარაგენტები (Refrigerants) არის სპეციალური ნივთიერებები, რომლებიც
		გამოყენებულია კონდიცირების სისტემებში, რათა გადაიტანონ სითბო ერთ ადგილიდან
		მეორეზე. ისინი ცირკულირებენ აგრეგატების სისტემაში და ახდენენ სითბოს
		შთანთქმას და გამოყოფას.
	</p>
</div>
<div class="kb-card">
	<h3 class="card__title">
		მაცივარაგენტების უსაფრთხოების კლასიფიკაცია (ASHRAE Standard 34)
	</h3>
	<div class="kb-safety-grid">
		<div class="kb-safety-item kb-border-green">
			<span class="kb-badge kb-bg-green">A1</span>
			<p style="margin-top: var(--space-xs)">
				<strong>არატოქსიკური, არადაალებადი (ყველაზე უსაფრთხო)</strong>
			</p>
		</div>
		<div class="kb-safety-item kb-border-orange">
			<span class="kb-badge kb-bg-orange">A2L</span>
			<p style="margin-top: var(--space-xs)">
				<strong>არატოქსიკური, ძნელად აალებადი (დაბალი წვის სიჩქარე).</strong>
			</p>
		</div>
		<div class="kb-safety-item kb-border-red">
			<span class="kb-badge kb-bg-red">A3</span>
			<p style="margin-top: var(--space-xs)">
				<strong>არატოქსიკური, მაღალი აალებადობა (ფეთქებადი)</strong><br />R600a,
				R290
			</p>
		</div>
		<div class="kb-safety-item kb-border-blue">
			<span class="kb-badge kb-bg-blue">B1/B2L</span>
			<p style="margin-top: var(--space-xs)"><strong>ტოქსიკური</strong></p>
		</div>
	</div>
	<h3 class="card__title" style="margin-top: var(--space-lg)">
		(ASHRAE Standard 34) კოდების განმარტება
	</h3>
	<div class="kb-safety-grid">
		<div>
			<h4 style="color: var(--color-text); margin-bottom: var(--space-sm)">
				ასოები (ტოქსიკურობა)
			</h4>
			<ul class="kb-list">
				<li>
					<span class="kb-badge kb-bg-green">A</span>
					<strong>არატოქსიკური</strong> (უსაფრთხოა ადამიანისთვის).
				</li>
				<li>
					<span class="kb-badge kb-bg-blue">B</span>
					<strong>ტოქსიკური</strong> (საშიშია სუნთქვისას, მაგ: ამიაკი).
				</li>
			</ul>
		</div>
		<div>
			<h4 style="color: var(--color-danger); margin-bottom: var(--space-sm)">
				ციფრები (აალებადობა)
			</h4>
			<ul class="kb-list">
				<li><strong>1</strong> – არ იწვის (ყველაზე უსაფრთხო).</li>
				<li><strong>2L</strong> – ძნელად აალებადი (Low).</li>
				<li><strong>2</strong> – აალებადი.</li>
				<li><strong>3</strong> – ფეთქებადი (მაგ: პროპანი).</li>
			</ul>
		</div>
	</div>
</div>
<div class="kb-card">
	<h3 class="card__title">ნარევების ტიპები: აზეოტროპული და ზეოტროპული</h3>
	<div class="kb-safety-grid">
		<div>
			<h4 style="color: var(--color-primary)">ზეოტროპული (Zeotropic)</h4>
			<p
				style="
					font-size: 0.9rem;
					margin-top: var(--space-xs);
					color: var(--color-text-muted);
				"
			>
				ნარევის კომპონენტებს აქვთ დუღილის სხვადასხვა ტემპერატურა (სრიალი).
			</p>
			<ul class="kb-list" style="margin-top: var(--space-sm)">
				<li>
					ახასიათებს <strong>"ტემპერატურული სრიალი" (Glide)</strong> -
					კომპონენტები არაერთდროულად დუღს.
				</li>
				<li>
					სისტემაში უნდა ჩაიტვირთოს მხოლოდ
					<strong>თხევადი (Liquid)</strong> სახით, რომ შემადგენლობა არ დაირღვეს.
				</li>
				<li><strong>მაგალითები:</strong> R-407C, R-404A.</li>
				<li>სერია: <strong>400</strong> (უმეტესობა).</li>
			</ul>
		</div>
		<div>
			<h4 style="color: var(--color-primary)">აზეოტროპული (Azeotropic)</h4>
			<p
				style="
					font-size: 0.9rem;
					margin-top: var(--space-xs);
					color: var(--color-text-muted);
				"
			>
				ნარევი იქცევა როგორც ერთი სუფთა ნივთიერება.
			</p>
			<ul class="kb-list" style="margin-top: var(--space-sm)">
				<li>დუღს მუდმივ ტემპერატურაზე (არ აქვს სრიალი/Glide).</li>
				<li>შეიძლება ჩაიტვირთოს როგორც თხევადი, ისე აირადი სახით.</li>
				<li><strong>მაგალითები:</strong> R-410A (თითქმის აზეოტროპული).</li>
				<li>
					<span style="font-size: 0.85rem; color: var(--color-text-light)">
						შენიშვნა: R-410A-ს მიუხედავად იმისა რომ სრიალი არ აქვს, მაინც
						თხევადი სახით ვტენით, რომ 50/50 პროპორცია ზუსტად დავიცვათ.
					</span>
				</li>
			</ul>
		</div>
	</div>
</div>
<h3 class="card__title">მნიშვნელოვანი ტექნიკური განმარტებები</h3>
<div class="kb-safety-grid">
	<div
		class="kb-safety-item"
		style="border-left: 5px solid var(--color-text-muted)"
	>
		<strong style="color: var(--color-text); font-size: 1.1em"
			>🌡️ ტემპერატურული სრიალი (Glide)</strong
		>
		<p
			style="
				font-size: 0.9rem;
				margin-top: var(--space-xs);
				line-height: var(--lh-normal);
			"
		>
			ეს არის ტემპერატურული სხვაობა ნარევის დუღილის დაწყებასა (Bubble Point) და
			დასრულებას (Dew Point) შორის მუდმივი წნევის დროს.
		</p>
		<ul class="kb-list" style="margin-top: var(--space-sm); font-size: 0.9rem">
			<li>
				<strong>რას ნიშნავს პრაქტიკაში?</strong> თუ ფრეონს (მაგ: R-407C) აქვს
				დიდი სრიალი, ის აორთქლებას იწყებს ერთ ტემპერატურაზე და ამთავრებს უფრო
				მაღალ ტემპერატურაზე.
			</li>
			<li>
				<strong>საფრთხე:</strong> თუ სისტემაში გაჟონვაა, "სრიალიანი" ფრეონის
				შემადგენლობა იცვლება (მსუბუქი კომპონენტები ორთქლდება), ამიტომ ხშირად
				საჭიროა ფრეონის სრული გამოცვლა და არა დამატება.
			</li>
		</ul>
	</div>
	<div class="kb-safety-item kb-border-red">
		<strong style="color: var(--color-danger); font-size: 1.1em"
			>🔥 კრიტიკული ტემპერატურა (Critical Temp)</strong
		>
		<p
			style="
				font-size: 0.9rem;
				margin-top: var(--space-xs);
				line-height: var(--lh-normal);
			"
		>
			ეს არის ტემპერატურის ზღვარი, რომლის ზემოთაც ფრეონი
			<strong>ვეღარ გათხევადდება</strong>, რაც არ უნდა მაღალი წნევით დავჭირხნოთ
			იგი.
		</p>
		<ul class="kb-list" style="margin-top: var(--space-sm); font-size: 0.9rem">
			<li>
				<strong>რას ნიშნავს პრაქტიკაში?</strong> თუ გარემო ტემპერატურა
				მიუახლოვდება კრიტიკულს (მაგ: R-410A-სთვის 71°C), სისტემის ეფექტურობა
				მკვეთრად ეცემა.
			</li>
			<li>
				მაგალითად: <strong>R-134a</strong>-ს აქვს მაღალი კრიტიკული ტემპერატურა
				(101°C), ამიტომ ის კარგად მუშაობს ძალიან ცხელ კლიმატში, ხოლო
				<strong>CO2 (R-744)</strong>-ს აქვს დაბალი (31°C), რაც ართულებს მის
				გამოყენებას სიცხეში.
			</li>
		</ul>
	</div>
</div>
<br />
<div class="kb-card">
	<h3 class="card__title">ქიმიური ჯგუფების განმარტება</h3>
	<p class="card__description">
		ეს აბრევიატურები გვიჩვენებს ფრეონის შემადგენლობას, რაც განსაზღვრავს მის
		გავლენას ოზონსა და გლობალურ დათბობაზე.
	</p>
	<div class="kb-safety-grid">
		<div>
			<ul class="kb-list">
				<li style="margin-bottom: var(--space-md)">
					<span class="kb-badge kb-badge-sub">წქფნ(HCFC)</span>
					<strong>HydroChlorofluorocarbons</strong>
					<div
						style="
							font-size: 0.9rem;
							color: var(--color-text-muted);
							margin-top: var(--space-2xs);
						"
					>
						(ჰიდროქლოროფტორნახშირბადები)<br />
						შეიცავს <strong>ქლორს</strong>. შლის ოზონის შრეს. ეტაპობრივად
						იკრძალება. (მაგ: R-22).
					</div>
				</li>
				<li style="margin-bottom: var(--space-md)">
					<span class="kb-badge kb-badge-sub">წფნ(HFC)</span>
					<strong>Hydrofluorocarbons</strong>
					<div
						style="
							font-size: 0.9rem;
							color: var(--color-text-muted);
							margin-top: var(--space-2xs);
						"
					>
						(ჰიდროფტორნახშირბადები)<br />
						არ შეიცავს ქლორს (ოზონუსაფრთხოა), მაგრამ იწვევს
						<strong>გლობალურ დათბობას</strong>. (მაგ: R-410A, R-134a).
					</div>
				</li>
			</ul>
		</div>
		<div>
			<ul class="kb-list">
				<li style="margin-bottom: var(--space-md)">
					<span class="kb-badge kb-badge-sub">HFO</span>
					<strong>Hydrofluoroolefins</strong>
					<div
						style="
							font-size: 0.9rem;
							color: var(--color-text-muted);
							margin-top: var(--space-2xs);
						"
					>
						(ჰიდროფტოროლეფინები)<br />
						მე-4 თაობა. უსაფრთხოა ოზონისთვის და
						<strong>არ იწვევს დათბობას</strong>. (მაგ: R-1234yf).
					</div>
				</li>
				<li style="margin-bottom: var(--space-md)">
					<span class="kb-badge kb-badge-sub">HC</span>
					<strong>Hydrocarbons</strong>
					<div
						style="
							font-size: 0.9rem;
							color: var(--color-text-muted);
							margin-top: var(--space-2xs);
						"
					>
						(ნახშირწყალბადები)<br />
						ბუნებრივი აირები. ძალიან ეფექტური და ეკოლოგიური, მაგრამ
						<strong>ფეთქებადი</strong>. (მაგ: R-290).
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
<h3 class="card__title">გარემოსდაცვითი ტერმინები და რეგულაციები</h3>
<div class="kb-safety-grid" style="margin-bottom: var(--space-lg)">
	<div class="kb-safety-item kb-border-blue">
		<strong style="color: var(--color-info); font-size: 1.1em">ODP</strong>
		<p style="font-weight: bold; margin: var(--space-xs) 0">
			Ozone Depletion Potential
		</p>
		<p style="font-size: 0.9rem">
			ოზონის შრის დაშლის პოტენციალი.
			<br /><br />
			ზომავს რამდენად აზიანებს ფრეონი ოზონის შრეს. ათვლის წერტილია
			<strong>R-11 (ODP = 1)</strong>.
			<br />
			<span style="color: var(--color-success)">მიზანი: ODP = 0</span>
		</p>
	</div>
	<div class="kb-safety-item kb-border-red">
		<strong style="color: var(--color-danger); font-size: 1.1em">GWP</strong>
		<p style="font-weight: bold; margin: var(--space-xs) 0">
			Global Warming Potential
		</p>
		<p style="font-size: 0.9rem">
			გლობალური დათბობის პოტენციალი.
			<br /><br />
			ზომავს რამდენად ათბობს ფრეონი დედამიწას
			<span style="text-decoration: underline">CO2-თან შედარებით</span> (CO2 =
			1). <br />მაგ: R-410A-ს GWP არის 2088, რაც ნიშნავს, რომ 1 კგ ფრეონი ათბობს
			ისე, როგორც 2 ტონა CO2.
		</p>
	</div>
	<div
		class="kb-safety-item"
		style="border-left: 5px solid var(--color-text-light)"
	>
		<strong style="color: var(--color-text-light); font-size: 1.1em"
			>TEWI</strong
		>
		<p style="font-weight: bold; margin: var(--space-xs) 0">
			Total Equivalent Warming Impact
		</p>
		<p style="font-size: 0.9rem">
			სრული ეკვივალენტური დათბობის ეფექტი.
			<br /><br />
			ითვალისწინებს ორ ფაქტორს: 1. <strong>პირდაპირი:</strong> ფრეონის გაჟონვა
			სისტემიდან. 2. <strong>არაპირდაპირი:</strong> ელ. ენერგიის ხარჯი სისტემის
			მუშაობისას.
		</p>
	</div>
</div>
<div
	style="
		background-color: var(--color-surface-hover);
		padding: var(--space-md);
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-info);
	"
>
	<h4
		style="
			margin: 0 0 var(--space-xs) 0;
			color: var(--color-text);
			display: flex;
			align-items: center;
		"
	>
		<span style="font-size: 1.2em; margin-right: var(--space-xs)">🌍</span>
		კიგალის შესწორება (Kigali Amendment)
	</h4>
	<p style="font-size: 0.95rem; line-height: var(--lh-normal); margin: 0">
		ეს არის <strong>მონრეალის ოქმის </strong>დამატება, რომელიც მიღებულია
		<strong>2016</strong> წელს. თავად მონრეალის ოქმი <strong>1987</strong> წელს
		მიიღეს და მისი მიზანი იყო ქლორის შემცველი მაცივარაგენტების -
		<strong>ქფნ (CFC)</strong> და <strong>წქფნ(HCFC)</strong> ტიპის ფრეონების -
		ეტაპობრივი ამოღება, რადგან ისინი აზიანებდნენ <strong>ოზონის შრეს</strong>.
		დამატება (ცნობილი როგორც <strong>Kigali Amendment</strong>) ავალდებულებს
		ქვეყნებს ეტაპობრივად შეამცირონ მაღალი GWP-ს მქონე
		<strong>წფნ(HFC)</strong> ფრეონების (მაგალითად R-134a, R-410A) გამოყენება და
		გადაინაცვლონ ეკოლოგიურ <strong>HFO</strong> მაცივარაგენტებზე ან ბუნებრივ
		მაცივარაგენტებზე.
	</p>
</div>
<br />
<div class="kb-card">
	<h3 class="card__title">მაცივარაგენტების ტექნიკური ცხრილი</h3>
	<div class="kb-table-responsive">
		<table class="kb-table">
			<thead>
				<tr>
					<th>მაცივარაგენტი</th>
					<th>ქიმიური ჯგუფი</th>
					<th>შემადგენლობა</th>
					<th>სრიალი (Glide)</th>
					<th>ზეთი (Oil)</th>
					<th>უსაფრთხოება / GWP</th>
					<th>გამოყენება</th>
					<th>ბალონის ფერი</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>R-22</strong></td>
					<td><span class="kb-badge kb-badge-sub">წქფნ(HCFC)</span></td>
					<td>ქლოროდიფტორმეთანი</td>
					<td>არა (0°C)</td>
					<td>MO, AB</td>
					<td>
						<strong style="color: var(--color-success)">A1</strong> / 1810
					</td>
					<td>ძველი სისტემები (აკრძალულია)</td>
					<td style="color: var(--color-r22); font-weight: var(--fw-bold)">
						ღია მწვანე
					</td>
				</tr>
				<tr>
					<td><strong>R-134a</strong></td>
					<td><span class="kb-badge kb-badge-sub">წფნ(HFC)</span></td>
					<td>ტეტრაფტორეთანი</td>
					<td>არა (0°C)</td>
					<td>POE, PAG</td>
					<td>
						<strong style="color: var(--color-success)">A1</strong> / 1430
					</td>
					<td>ავტომობილები, მაცივრები</td>
					<td style="color: var(--color-r134a); font-weight: var(--fw-bold)">
						ცისფერი
					</td>
				</tr>
				<tr>
					<td><strong>R-1234yf</strong></td>
					<td><span class="kb-badge kb-badge-sub">HFO</span></td>
					<td>ტეტრაფტორპროპენი</td>
					<td>არა (0°C)</td>
					<td>POE, PAG</td>
					<td><strong style="color: var(--color-orange)">A2L</strong> / 4</td>
					<td>ახალი ავტომობილები</td>
					<td style="font-weight: var(--fw-bold); color: var(--color-r32)">
						წითელი ზოლით
					</td>
				</tr>
				<tr>
					<td><strong>R-404A</strong></td>
					<td><span class="kb-badge kb-badge-sub">წფნ(HFC) (ნარევი)</span></td>
					<td>R-125 + R-143a + R-134a</td>
					<td>მცირე (~0.8°C)</td>
					<td>POE</td>
					<td>
						<strong style="color: var(--color-success)">A1</strong> / 3922
					</td>
					<td>კომერციული გაყინვა</td>
					<td style="color: var(--color-r404a); font-weight: var(--fw-bold)">
						ნარინჯისფერი
					</td>
				</tr>
				<tr>
					<td><strong>R-407C</strong></td>
					<td><span class="kb-badge kb-badge-sub">წფნ(HFC) (ნარევი)</span></td>
					<td>R-32 + R-125 + R-134a</td>
					<td>
						<strong style="color: var(--color-danger)">დიახ (~7°C)</strong>
					</td>
					<td>POE</td>
					<td>
						<strong style="color: var(--color-success)">A1</strong> / 1774
					</td>
					<td>R-22-ის შემცვლელი</td>
					<td style="color: var(--color-r407c); font-weight: var(--fw-bold)">
						მოყავისფრო
					</td>
				</tr>
				<tr>
					<td><strong>R-410A</strong></td>
					<td><span class="kb-badge kb-badge-sub">წფნ(HFC) (ნარევი)</span></td>
					<td>R-32 (50%) + R-125 (50%)</td>
					<td>თითქმის 0 (0.1°C)</td>
					<td>POE</td>
					<td>
						<strong style="color: var(--color-success)">A1</strong> / 2088
					</td>
					<td>თანამედროვე კონდიციონერები</td>
					<td style="color: var(--color-r410a); font-weight: var(--fw-bold)">
						ვარდისფერი
					</td>
				</tr>
				<tr>
					<td><strong>R-32</strong></td>
					<td><span class="kb-badge kb-badge-sub">წფნ(HFC)</span></td>
					<td>დიფტორმეთანი</td>
					<td>არა (0°C)</td>
					<td>POE</td>
					<td><strong style="color: var(--color-orange)">A2L</strong> / 675</td>
					<td>უახლესი კონდიციონერები</td>
					<td style="color: var(--color-r32); font-weight: var(--fw-bold)">
						წითელი ზოლით
					</td>
				</tr>
				<tr>
					<td><strong>R-290</strong></td>
					<td><span class="kb-badge kb-badge-sub">HC</span></td>
					<td>პროპანი</td>
					<td>არა (0°C)</td>
					<td>MO, POE</td>
					<td><strong style="color: var(--color-danger)">A3</strong> / 3</td>
					<td>მცირე კომერციული მაცივრები</td>
					<td>-</td>
				</tr>
				<tr>
					<td><strong>R-600a</strong></td>
					<td><span class="kb-badge kb-badge-sub">HC</span></td>
					<td>იზობუტანი</td>
					<td>არა (0°C)</td>
					<td>MO</td>
					<td><strong style="color: var(--color-danger)">A3</strong> / 3</td>
					<td>საყოფაცხოვრებო მაცივრები</td>
					<td>-</td>
				</tr>
				<tr>
					<td><strong>R-123</strong></td>
					<td><span class="kb-badge kb-badge-sub">წქფნ(HCFC)</span></td>
					<td>დიქლორტრიფტორეთანი</td>
					<td>არა (0°C)</td>
					<td>MO, AB</td>
					<td><strong style="color: var(--color-primary)">B1</strong> / 77</td>
					<td>ცენტრიდანული ჩილერები</td>
					<td style="color: var(--color-r123); font-weight: var(--fw-bold)">
						ღია ნაცრისფერი
					</td>
				</tr>
				<tr>
					<td><strong>R-717</strong></td>
					<td><span class="kb-badge kb-badge-sub">NH3</span></td>
					<td>ამიაკი</td>
					<td>არა (0°C)</td>
					<td>MO</td>
					<td><strong style="color: var(--color-primary)">B2L</strong> / 0</td>
					<td>ინდუსტრიული გაყინვა</td>
					<td style="color: var(--color-r717); font-weight: var(--fw-bold)">
						ვერცხლისფერი
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div class="kb-card">
	<h3 class="card__title">სამუშაო წნევები სეზონის მიხედვით</h3>
	<div class="kb-table-responsive">
		<table class="kb-table">
			<thead>
				<tr>
					<th rowspan="2" style="vertical-align: middle">ფრეონი</th>
					<th
						colspan="2"
						style="
							text-align: center;
							border-bottom: 2px solid var(--color-warning);
						"
					>
						☀️ ზაფხული / გაგრილება <br /><span
							style="font-weight: normal; font-size: 0.85rem"
							>(გარემო: +25°C ... +35°C)</span
						>
					</th>
					<th
						colspan="2"
						style="
							text-align: center;
							border-bottom: 2px solid var(--color-info);
						"
					>
						❄️ ზამთარი / გათბობა <br /><span
							style="font-weight: normal; font-size: 0.85rem"
							>(გარემო: 0°C ... +7°C)</span
						>
					</th>
				</tr>
				<tr>
					<th>დაბალი (Suction)</th>
					<th>მაღალი (Discharge)</th>
					<th>დაბალი (Outdoor Coil)</th>
					<th>მაღალი (Indoor Coil)</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>R-410A</strong></td>
					<td>
						110 - 130 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-info);
								font-weight: var(--fw-bold);
							"
						>
							7.5 - 9 Bar
						</div>
					</td>
					<td>
						320 - 450 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-danger);
								font-weight: var(--fw-bold);
							"
						>
							22 - 31 Bar
						</div>
					</td>
					<td>
						75 - 100 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-info);
								font-weight: var(--fw-bold);
							"
						>
							5 - 7 Bar
						</div>
					</td>
					<td>
						350 - 500 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-danger);
								font-weight: var(--fw-bold);
							"
						>
							24 - 34+ Bar
						</div>
					</td>
				</tr>
				<tr>
					<td><strong>R-32</strong></td>
					<td>
						115 - 135 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-info);
								font-weight: var(--fw-bold);
							"
						>
							8 - 9.5 Bar
						</div>
					</td>
					<td>
						360 - 480 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-danger);
								font-weight: var(--fw-bold);
							"
						>
							25 - 33 Bar
						</div>
					</td>
					<td>
						80 - 105 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-info);
								font-weight: var(--fw-bold);
							"
						>
							5.5 - 7.2 Bar
						</div>
					</td>
					<td>
						380 - 520 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-danger);
								font-weight: var(--fw-bold);
							"
						>
							26 - 36+ Bar
						</div>
					</td>
				</tr>
				<tr>
					<td><strong>R-22</strong></td>
					<td>
						60 - 75 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-info);
								font-weight: var(--fw-bold);
							"
						>
							4 - 5 Bar
						</div>
					</td>
					<td>
						250 - 280 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-danger);
								font-weight: var(--fw-bold);
							"
						>
							17 - 19 Bar
						</div>
					</td>
					<td>
						35 - 50 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-info);
								font-weight: var(--fw-bold);
							"
						>
							2.5 - 3.5 Bar
						</div>
					</td>
					<td>
						250 - 320 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-danger);
								font-weight: var(--fw-bold);
							"
						>
							17 - 22 Bar
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<strong>R-134a</strong><br /><span
							style="font-size: 0.8rem; color: var(--color-text-muted)"
							>(ავტო / მაცივარი)</span
						>
					</td>
					<td>
						<span style="font-size: 0.9rem">ავტო:</span> 25-35 PSI
						<span style="font-size: 0.8rem; color: var(--color-info)"
							>(1.7-2.4 Bar)</span
						><br />
						<span style="font-size: 0.9rem">მაცივარი:</span> 0-5 PSI
						<span style="font-size: 0.8rem; color: var(--color-info)"
							>(0-0.3 Bar)</span
						>
					</td>
					<td>
						150 - 220 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-danger);
								font-weight: var(--fw-bold);
							"
						>
							10 - 15 Bar
						</div>
					</td>
					<td
						colspan="2"
						style="
							text-align: center;
							font-size: 0.85rem;
							color: var(--color-text-muted);
							background-color: var(--color-surface-alt);
						"
					>
						<em
							>ზამთარში წნევა ეცემა გარემო ტემპერატურის შესაბამისად.<br />
							მაცივრები არ მუშაობენ რევერსზე.</em
						>
					</td>
				</tr>
				<tr>
					<td>
						<strong>R-600a</strong><br /><span
							style="font-size: 0.8rem; color: var(--color-text-muted)"
							>(იზობუტანი)</span
						>
					</td>
					<td>
						-5 ... 0 PSI (ვაკუუმი)
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-info);
								font-weight: var(--fw-bold);
							"
						>
							-0.3 - 0 Bar
						</div>
					</td>
					<td>
						50 - 80 PSI
						<div
							style="
								font-size: 0.85rem;
								color: var(--color-danger);
								font-weight: var(--fw-bold);
							"
						>
							3.5 - 5.5 Bar
						</div>
					</td>
					<td
						colspan="2"
						style="
							text-align: center;
							font-size: 0.85rem;
							color: var(--color-text-muted);
							background-color: var(--color-surface-alt);
						"
					>
						<em>დაბალ ტემპერატურაზე წნევა კიდევ უფრო ეცემა ვაკუუმში.</em>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div class="kb-card">
	<h3 class="card__title">პოპულარული ჩამნაცვლებლები (Retrofit)</h3>
	<div class="kb-table-responsive">
		<table class="kb-table">
			<thead>
				<tr>
					<th>ორიგინალი (ძველი)</th>
					<th>შემცვლელი (Retrofit)</th>
					<th>აუცილებელია თუ არა ზეთის შეცვლა?</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>R-22</strong></td>
					<td>R-407C, R-422D (MO29), R-417A</td>
					<td>R-407C (კი, POE-ზე), MO29 (არა, მუშაობს MO-ზეც)</td>
				</tr>
				<tr>
					<td><strong>R-12</strong></td>
					<td>R-134a</td>
					<td>კი, აუცილებელია POE/PAG ზეთი.</td>
				</tr>
				<tr>
					<td><strong>R-134a</strong></td>
					<td>R-1234yf (მანქანებში)</td>
					<td>არა, თავსებადია.</td>
				</tr>
				<tr>
					<td><strong>R-11</strong></td>
					<td>R-123</td>
					<td>უმეტესად კი.</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div style="margin-top: var(--space-xl)">
	<h3 class="card__title">ზეთების ტიპების განმარტება</h3>
	<p class="card__description">
		მაცივარაგენტისა და ზეთის თავსებადობა კრიტიკულად მნიშვნელოვანია სისტემის
		მუშაობისთვის.
	</p>
	<div class="kb-safety-grid">
		<div>
			<ul class="kb-list">
				<li style="margin-bottom: var(--space-xs)">
					<span
						class="kb-badge kb-badge-sub"
						style="background: var(--color-text-muted); color: #fff"
						>MO</span
					>
					<strong>Mineral Oil (მინერალური ზეთი)</strong>
					<br /><span style="font-size: 0.9rem; color: var(--color-text-muted)"
						>გამოიყენება R-22-ზე, ამიაკზე (R-717) და ბუნებრივ აირებზე (R-290,
						R-600a).</span
					>
				</li>
				<li style="margin-bottom: var(--space-xs)">
					<span
						class="kb-badge kb-badge-sub"
						style="background: var(--color-info); color: #fff"
						>POE</span
					>
					<strong>Polyolester (სინთეტიკური პოლიოლესტერი)</strong>
					<br /><span style="font-size: 0.9rem; color: var(--color-text-muted)">
						გამოიყენება ყველა წფნ(HFC) / HFO ფრეონზე (R-410A, R-404A, R-134a,
						R-32). ძალიან ჰიგროსკოპიულია (ისრუტავს ნესტს).
						<br />
						<strong style="color: var(--color-danger); font-size: 0.9rem"
							>რისკები:</strong
						>
						ნესტთან რეაქციით წარმოქმნის მჟავას, რაც
						<strong>აზიანებს კომპრესორის გრაგნილებს</strong>, წარმოქმნის შლამს
						რაც <strong>ჭედავს ფილტრსა და კაპილარს</strong>, ასევე იწვევს
						სპილენძის მილების დაჟანგვას / კოროზიას.
					</span>
				</li>
			</ul>
		</div>
		<div>
			<ul class="kb-list">
				<li style="margin-bottom: var(--space-xs)">
					<span
						class="kb-badge kb-badge-sub"
						style="background: var(--color-orange); color: #fff"
						>PAG</span
					>
					<strong>Polyalkylene Glycol (პოლიალკილენ გლიკოლი)</strong>
					<br /><span style="font-size: 0.9rem; color: var(--color-text-muted)"
						>ავტომობილების კონდიცირება (R-134a, R-1234yf).</span
					>
				</li>
				<li style="margin-bottom: var(--space-xs)">
					<span
						class="kb-badge kb-badge-sub"
						style="background: var(--color-text-light); color: #fff"
						>AB</span
					>
					<strong>Alkylbenzene (ალკილბენზოლი)</strong>
					<br /><span style="font-size: 0.9rem; color: var(--color-text-muted)"
						>გამოიყენება R-22-ზე და გარდამავალ წქფნ(HCFC) ფრეონებზე
						(R-123).</span
					>
				</li>
			</ul>
		</div>
	</div>
</div>
`
}
