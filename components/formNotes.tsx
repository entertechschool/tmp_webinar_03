"use client";

import { useState } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Props {
	aiModel: string;
}

export default function FormNotes({ aiModel }: Props) {
	const [loading, setLoading] = useState(false);
	const [note, setNote] = useState("");
	const [summarizeNote, setSummarizeNote] = useState("");

	const handleButton = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/openai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ rawNote: note }), // Enviar el texto dentro de un objeto JSON
			});

			if (response.ok) {
				const result = await response.json();
				setSummarizeNote(result.data);
			} else {
				console.error("Error al enviar los datos:", response.status);
			}
		} catch (error) {
			console.error("Error de red:", error);
			// Manejar el error de la red (conexión fallida, etc.)
		}
		setLoading(false);
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Escribe una nota para ser resumida</CardTitle>
				<CardDescription>Modelo: {aiModel}</CardDescription>
			</CardHeader>
			<CardContent>
				<Textarea placeholder="mis notas..." rows={5} value={note} onChange={(e) => setNote(e.target.value)} />
				{summarizeNote && (
					<>
						<Separator className="my-4" />
						<Textarea value={summarizeNote} disabled />
					</>
				)}
			</CardContent>
			<CardFooter>
				<Button className="w-full" variant="default" onClick={handleButton} disabled={loading}>
					{loading ? "Resumiendo..." : "Resumir"}
				</Button>
			</CardFooter>
		</Card>
	);
}
