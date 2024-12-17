import { Button, ButtonProps } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useState } from "react";

export const useConfirm = (
	title: string,
	message: string,
	variant: ButtonProps["variant"] = "default"
): [() => JSX.Element, () => Promise<unknown>] => {
	const [promise, setPromise] = useState<{
		resolve: (value: boolean) => void;
	} | null>(null);

	const confirm = () => {
		return new Promise(resolve => {
			setPromise({ resolve });
		});
	};

	const handleClose = () => {
		setPromise(null);
	};

	const handleConfirm = () => {
		promise?.resolve(true);
		handleClose();
	};

	const handleCancel = () => {
		promise?.resolve(false);
		handleClose();
	};

	const ConfirmationDialog = () => (
		<ResponsiveModal open={promise !== null} onOpenChange={handleClose}>
			<Card className="w-full h-full border-none shadow-none">
				<CardContent className="pt-8">
					<CardHeader className="p-0">
						<CardTitle>{title}</CardTitle>
						<CardDescription>{message}</CardDescription>
					</CardHeader>
					<div className="pt-4 w-full flex flex-col items-center justify-end gap-y-2 lg:flex-row gap-x-2">
						<Button
							onClick={handleCancel}
							variant="outline"
							className="w-full lg:w-auto "
						>
							取消
						</Button>
						<Button
							onClick={handleConfirm}
							variant={variant}
							className="w-full lg:w-auto "
						>
							确认
						</Button>
					</div>
				</CardContent>
			</Card>
		</ResponsiveModal>
	);
	return [ConfirmationDialog, confirm];
};
