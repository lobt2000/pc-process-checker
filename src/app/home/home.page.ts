import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/angular/standalone';
import { PcService } from '../services/pc.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SocketService } from '../services/socket.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FilterPipe } from '../pipes/filter.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    DatePipe,
    FilterPipe,
    IonInput,
    ReactiveFormsModule
  ],
})
export class HomePage implements OnInit {
  pcStatus: string = '';
  pcProcesses: any[] = [];
  searchProcess: FormControl = new FormControl('');
  private pcService = inject(PcService);
  private socketService = inject(SocketService);
  private dr = inject(DestroyRef);
  constructor() {}

  ngOnInit(): void {
    this.getPcStatus();
    this.socketService.getPcBootTime.subscribe((res) => {
      this.pcStatus = res ?? '';
    });

    this.socketService.getPcProcess.subscribe((res) => {
      this.pcProcesses = res ?? [];
    });
  }

  getPcStatus() {
    this.pcService
      .getPcStatus()
      .pipe(takeUntilDestroyed(this.dr))
      .subscribe(() => (this.pcStatus = ''));
  }

  getPcProcess() {
    this.pcService.getPcProcess().subscribe(() => (this.pcProcesses = []));
  }

  terminateProcess(pid: number) {
    this.pcService.terminateProcess(pid).subscribe();
  }
}
