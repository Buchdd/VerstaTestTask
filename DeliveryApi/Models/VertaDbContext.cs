using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace DeliveryApi.Models;

public partial class VertaDbContext : DbContext
{
    public VertaDbContext()
    {
    }

    public VertaDbContext(DbContextOptions<VertaDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Cargo> Cargos { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=VertaDB;user=root;password=1234", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.46-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("addresses");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apartment)
                .HasMaxLength(20)
                .HasColumnName("apartment");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.House)
                .HasMaxLength(20)
                .HasColumnName("house");
            entity.Property(e => e.Street)
                .HasMaxLength(255)
                .HasColumnName("street");
        });

        modelBuilder.Entity<Cargo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("cargo");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Weight).HasColumnName("weight");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.IdCargo, "idCargo");

            entity.HasIndex(e => e.IdRecipientAddress, "idRecipientAddress");

            entity.HasIndex(e => e.IdSenderAddress, "idSenderAddress");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DatePickup).HasColumnName("datePickup");
            entity.Property(e => e.IdCargo).HasColumnName("idCargo");
            entity.Property(e => e.IdRecipientAddress).HasColumnName("idRecipientAddress");
            entity.Property(e => e.IdSenderAddress).HasColumnName("idSenderAddress");

            entity.HasOne(d => d.IdCargoNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.IdCargo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orders_ibfk_3");

            entity.HasOne(d => d.IdRecipientAddressNavigation).WithMany(p => p.OrderIdRecipientAddressNavigations)
                .HasForeignKey(d => d.IdRecipientAddress)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orders_ibfk_2");

            entity.HasOne(d => d.IdSenderAddressNavigation).WithMany(p => p.OrderIdSenderAddressNavigations)
                .HasForeignKey(d => d.IdSenderAddress)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("orders_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
